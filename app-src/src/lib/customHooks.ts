import { useState, useCallback } from "react";
import { checkLoginWithRefresh } from "@/lib/utils";
// Add the AWS_PRIVATE_GRAPHQL_ENDPOINT import
import { AWS_PRIVATE_GRAPHQL_ENDPOINT } from "@/lib/config";

export const useUsernameManagement = (t: (key: string) => string) => {
  const [showUsernamePrompt, setShowUsernamePrompt] = useState<boolean>(false);
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [showAltButton, setShowAltButton] = useState<boolean>(false);
  const [isSubmittingUsername, setIsSubmittingUsername] = useState<boolean>(false);

  const validateUsername = useCallback((username: string) => {
    const isValid = /^[a-zA-Z0-9-]+$/.test(username);
    console.log(`Username validation for '${username}': ${isValid}`);
    return isValid;
  }, []);

  const submitUsername = useCallback(async (proposedName: string, onSuccess: (newName: string) => void) => {
    console.log(`Submitting username: ${proposedName}`);
    setIsSubmittingUsername(true);
    setUsernameError("");

    const token = await checkLoginWithRefresh();
    if (!token) {
      setUsernameError(t('Authentication error. Please try again.'));
      setIsSubmittingUsername(false);
      return;
    }

    const mutation = `
      mutation MyMutation($savePublicProfileDisplayNameInput: SavePublicProfileDisplayNameInput) {
        changeMyAccountItem(savePublicProfileDisplayNameInput: $savePublicProfileDisplayNameInput) {
          ... on Profile {
            anyDisplayName
          }
        }
      }
    `;

    const variables = {
      savePublicProfileDisplayNameInput: {
        anyDisplayName: proposedName,
      },
    };

    try {
      const res = await fetch(AWS_PRIVATE_GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query: mutation, variables }),
      });

      const json = await res.json();
      const newName = json?.data?.changeMyAccountItem?.anyDisplayName;

      if (newName) {
        onSuccess(newName);
      } else {
        throw new Error("Username taken");
      }
    } catch (e) {
      console.error(`Error submitting username: ${e}`);
      setUsernameError(t('Username is already taken. Please try a different one.'));
      setShowAltButton(true);
      setIsSubmittingUsername(false);
    }
  }, [t]);

  const appendRandomDigits = useCallback((onSuccess: (newName: string) => void) => {
    const digits = Math.floor(100000 + Math.random() * 900000).toString();
    const modified = `${usernameInput}${digits}`;
    console.log(`Appending random digits to username: ${usernameInput} -> ${modified}`);
    setUsernameInput(modified);
    submitUsername(modified, onSuccess);
  }, [usernameInput, submitUsername]);

  return {
    showUsernamePrompt,
    setShowUsernamePrompt,
    usernameInput,
    setUsernameInput,
    usernameError,
    setUsernameError,
    showAltButton,
    setShowAltButton,
    isSubmittingUsername,
    setIsSubmittingUsername,
    validateUsername,
    submitUsername,
    appendRandomDigits
  };
};
