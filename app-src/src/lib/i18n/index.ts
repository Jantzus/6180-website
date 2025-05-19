// src/lib/i18n/index.ts
import { 
  supportedLanguages, 
  rtlLanguages,
  getLanguageDirection
} from '@/lib/i18n/translations';
import type { SupportedLanguage } from '@/lib/i18n/translations';

// This will store loaded translation objects
const translationCache: Record<SupportedLanguage, Record<string, string> | null> = {} as Record<SupportedLanguage, Record<string, string> | null>;

// Current language state
let currentLanguage: SupportedLanguage = 'en';

// Define import resolver for translations
const getTranslationModule = (lang: string) => {
  // This approach uses explicit imports for each language
  // to help Vite's static analysis
  switch (lang) {
    case 'aa': return import('@/lib/i18n/translations/aa.json');
    case 'ab': return import('@/lib/i18n/translations/ab.json');
    case 'ace': return import('@/lib/i18n/translations/ace.json');
    case 'ady': return import('@/lib/i18n/translations/ady.json');
    case 'af': return import('@/lib/i18n/translations/af.json');
    case 'ak': return import('@/lib/i18n/translations/ak.json');
    case 'als': return import('@/lib/i18n/translations/als.json');
    case 'am': return import('@/lib/i18n/translations/am.json');
    case 'an': return import('@/lib/i18n/translations/an.json');
    case 'ang': return import('@/lib/i18n/translations/ang.json');
    case 'ar': return import('@/lib/i18n/translations/ar.json');
    case 'arc': return import('@/lib/i18n/translations/arc.json');
    case 'arz': return import('@/lib/i18n/translations/arz.json');
    case 'as': return import('@/lib/i18n/translations/as.json');
    case 'ast': return import('@/lib/i18n/translations/ast.json');
    case 'av': return import('@/lib/i18n/translations/av.json');
    case 'ay': return import('@/lib/i18n/translations/ay.json');
    case 'az': return import('@/lib/i18n/translations/az.json');
    case 'ba': return import('@/lib/i18n/translations/ba.json');
    case 'bar': return import('@/lib/i18n/translations/bar.json');
    case 'bat-smg': return import('@/lib/i18n/translations/bat-smg.json');
    case 'bcl': return import('@/lib/i18n/translations/bcl.json');
    case 'be': return import('@/lib/i18n/translations/be.json');
    case 'be-x-old': return import('@/lib/i18n/translations/be-x-old.json');
    case 'bg': return import('@/lib/i18n/translations/bg.json');
    case 'bh': return import('@/lib/i18n/translations/bh.json');
    case 'bho': return import('@/lib/i18n/translations/bho.json');
    case 'bi': return import('@/lib/i18n/translations/bi.json');
    case 'bjn': return import('@/lib/i18n/translations/bjn.json');
    case 'bm': return import('@/lib/i18n/translations/bm.json');
    case 'bn': return import('@/lib/i18n/translations/bn.json');
    case 'bo': return import('@/lib/i18n/translations/bo.json');
    case 'bpy': return import('@/lib/i18n/translations/bpy.json');
    case 'br': return import('@/lib/i18n/translations/br.json');
    case 'brx': return import('@/lib/i18n/translations/brx.json');
    case 'bs': return import('@/lib/i18n/translations/bs.json');
    case 'bug': return import('@/lib/i18n/translations/bug.json');
    case 'bxr': return import('@/lib/i18n/translations/bxr.json');
    case 'ca': return import('@/lib/i18n/translations/ca.json');
    case 'cbk-zam': return import('@/lib/i18n/translations/cbk-zam.json');
    case 'cdo': return import('@/lib/i18n/translations/cdo.json');
    case 'ce': return import('@/lib/i18n/translations/ce.json');
    case 'ceb': return import('@/lib/i18n/translations/ceb.json');
    case 'ch': return import('@/lib/i18n/translations/ch.json');
    case 'cho': return import('@/lib/i18n/translations/cho.json');
    case 'chr': return import('@/lib/i18n/translations/chr.json');
    case 'chy': return import('@/lib/i18n/translations/chy.json');
    case 'ckb': return import('@/lib/i18n/translations/ckb.json');
    case 'co': return import('@/lib/i18n/translations/co.json');
    case 'cr': return import('@/lib/i18n/translations/cr.json');
    case 'crh': return import('@/lib/i18n/translations/crh.json');
    case 'cs': return import('@/lib/i18n/translations/cs.json');
    case 'csb': return import('@/lib/i18n/translations/csb.json');
    case 'cu': return import('@/lib/i18n/translations/cu.json');
    case 'cv': return import('@/lib/i18n/translations/cv.json');
    case 'cy': return import('@/lib/i18n/translations/cy.json');
    case 'da': return import('@/lib/i18n/translations/da.json');
    case 'de': return import('@/lib/i18n/translations/de.json');
    case 'diq': return import('@/lib/i18n/translations/diq.json');
    case 'doi': return import('@/lib/i18n/translations/doi.json');
    case 'dsb': return import('@/lib/i18n/translations/dsb.json');
    case 'dv': return import('@/lib/i18n/translations/dv.json');
    case 'dz': return import('@/lib/i18n/translations/dz.json');
    case 'ee': return import('@/lib/i18n/translations/ee.json');
    case 'el': return import('@/lib/i18n/translations/el.json');
    case 'eml': return import('@/lib/i18n/translations/eml.json');
    case 'en': return import('@/lib/i18n/translations/en.json');
    case 'eo': return import('@/lib/i18n/translations/eo.json');
    case 'es': return import('@/lib/i18n/translations/es.json');
    case 'et': return import('@/lib/i18n/translations/et.json');
    case 'eu': return import('@/lib/i18n/translations/eu.json');
    case 'ext': return import('@/lib/i18n/translations/ext.json');
    case 'fa': return import('@/lib/i18n/translations/fa.json');
    case 'ff': return import('@/lib/i18n/translations/ff.json');
    case 'fi': return import('@/lib/i18n/translations/fi.json');
    case 'fiu-vro': return import('@/lib/i18n/translations/fiu-vro.json');
    case 'fj': return import('@/lib/i18n/translations/fj.json');
    case 'fo': return import('@/lib/i18n/translations/fo.json');
    case 'fr': return import('@/lib/i18n/translations/fr.json');
    case 'frp': return import('@/lib/i18n/translations/frp.json');
    case 'frr': return import('@/lib/i18n/translations/frr.json');
    case 'fur': return import('@/lib/i18n/translations/fur.json');
    case 'fy': return import('@/lib/i18n/translations/fy.json');
    case 'ga': return import('@/lib/i18n/translations/ga.json');
    case 'gag': return import('@/lib/i18n/translations/gag.json');
    case 'gan': return import('@/lib/i18n/translations/gan.json');
    case 'gd': return import('@/lib/i18n/translations/gd.json');
    case 'gl': return import('@/lib/i18n/translations/gl.json');
    case 'glk': return import('@/lib/i18n/translations/glk.json');
    case 'gn': return import('@/lib/i18n/translations/gn.json');
    case 'gom': return import('@/lib/i18n/translations/gom.json');
    case 'got': return import('@/lib/i18n/translations/got.json');
    case 'grt': return import('@/lib/i18n/translations/grt.json');
    case 'gu': return import('@/lib/i18n/translations/gu.json');
    case 'gv': return import('@/lib/i18n/translations/gv.json');
    case 'ha': return import('@/lib/i18n/translations/ha.json');
    case 'hak': return import('@/lib/i18n/translations/hak.json');
    case 'haw': return import('@/lib/i18n/translations/haw.json');
    case 'he': return import('@/lib/i18n/translations/he.json');
    case 'hi': return import('@/lib/i18n/translations/hi.json');
    case 'hif': return import('@/lib/i18n/translations/hif.json');
    case 'hne': return import('@/lib/i18n/translations/hne.json');
    case 'ho': return import('@/lib/i18n/translations/ho.json');
    case 'hr': return import('@/lib/i18n/translations/hr.json');
    case 'hsb': return import('@/lib/i18n/translations/hsb.json');
    case 'ht': return import('@/lib/i18n/translations/ht.json');
    case 'hu': return import('@/lib/i18n/translations/hu.json');
    case 'hy': return import('@/lib/i18n/translations/hy.json');
    case 'hz': return import('@/lib/i18n/translations/hz.json');
    case 'ia': return import('@/lib/i18n/translations/ia.json');
    case 'id': return import('@/lib/i18n/translations/id.json');
    case 'ie': return import('@/lib/i18n/translations/ie.json');
    case 'ig': return import('@/lib/i18n/translations/ig.json');
    case 'ii': return import('@/lib/i18n/translations/ii.json');
    case 'ik': return import('@/lib/i18n/translations/ik.json');
    case 'ilo': return import('@/lib/i18n/translations/ilo.json');
    case 'inh': return import('@/lib/i18n/translations/inh.json');
    case 'io': return import('@/lib/i18n/translations/io.json');
    case 'is': return import('@/lib/i18n/translations/is.json');
    case 'it': return import('@/lib/i18n/translations/it.json');
    case 'iu': return import('@/lib/i18n/translations/iu.json');
    case 'ja': return import('@/lib/i18n/translations/ja.json');
    case 'jam': return import('@/lib/i18n/translations/jam.json');
    case 'jbo': return import('@/lib/i18n/translations/jbo.json');
    case 'jv': return import('@/lib/i18n/translations/jv.json');
    case 'ka': return import('@/lib/i18n/translations/ka.json');
    case 'kaa': return import('@/lib/i18n/translations/kaa.json');
    case 'kab': return import('@/lib/i18n/translations/kab.json');
    case 'kbd': return import('@/lib/i18n/translations/kbd.json');
    case 'kg': return import('@/lib/i18n/translations/kg.json');
    case 'kha': return import('@/lib/i18n/translations/kha.json');
    case 'ki': return import('@/lib/i18n/translations/ki.json');
    case 'kj': return import('@/lib/i18n/translations/kj.json');
    case 'kk': return import('@/lib/i18n/translations/kk.json');
    case 'kl': return import('@/lib/i18n/translations/kl.json');
    case 'km': return import('@/lib/i18n/translations/km.json');
    case 'kn': return import('@/lib/i18n/translations/kn.json');
    case 'ko': return import('@/lib/i18n/translations/ko.json');
    case 'koi': return import('@/lib/i18n/translations/koi.json');
    case 'kok': return import('@/lib/i18n/translations/kok.json');
    case 'kr': return import('@/lib/i18n/translations/kr.json');
    case 'krc': return import('@/lib/i18n/translations/krc.json');
    case 'ks': return import('@/lib/i18n/translations/ks.json');
    case 'ksh': return import('@/lib/i18n/translations/ksh.json');
    case 'ku': return import('@/lib/i18n/translations/ku.json');
    case 'kv': return import('@/lib/i18n/translations/kv.json');
    case 'kw': return import('@/lib/i18n/translations/kw.json');
    case 'ky': return import('@/lib/i18n/translations/ky.json');
    case 'la': return import('@/lib/i18n/translations/la.json');
    case 'lad': return import('@/lib/i18n/translations/lad.json');
    case 'lb': return import('@/lib/i18n/translations/lb.json');
    case 'lbe': return import('@/lib/i18n/translations/lbe.json');
    case 'lez': return import('@/lib/i18n/translations/lez.json');
    case 'lg': return import('@/lib/i18n/translations/lg.json');
    case 'li': return import('@/lib/i18n/translations/li.json');
    case 'lij': return import('@/lib/i18n/translations/lij.json');
    case 'lmo': return import('@/lib/i18n/translations/lmo.json');
    case 'ln': return import('@/lib/i18n/translations/ln.json');
    case 'lo': return import('@/lib/i18n/translations/lo.json');
    case 'lrc': return import('@/lib/i18n/translations/lrc.json');
    case 'lt': return import('@/lib/i18n/translations/lt.json');
    case 'ltg': return import('@/lib/i18n/translations/ltg.json');
    case 'lus': return import('@/lib/i18n/translations/lus.json');
    case 'lv': return import('@/lib/i18n/translations/lv.json');
    case 'mag': return import('@/lib/i18n/translations/mag.json');
    case 'mai': return import('@/lib/i18n/translations/mai.json');
    case 'map-bms': return import('@/lib/i18n/translations/map-bms.json');
    case 'mdf': return import('@/lib/i18n/translations/mdf.json');
    case 'mg': return import('@/lib/i18n/translations/mg.json');
    case 'mh': return import('@/lib/i18n/translations/mh.json');
    case 'mhr': return import('@/lib/i18n/translations/mhr.json');
    case 'mi': return import('@/lib/i18n/translations/mi.json');
    case 'min': return import('@/lib/i18n/translations/min.json');
    case 'mk': return import('@/lib/i18n/translations/mk.json');
    case 'ml': return import('@/lib/i18n/translations/ml.json');
    case 'mn': return import('@/lib/i18n/translations/mn.json');
    case 'mni': return import('@/lib/i18n/translations/mni.json');
    case 'mo': return import('@/lib/i18n/translations/mo.json');
    case 'mr': return import('@/lib/i18n/translations/mr.json');
    case 'mrj': return import('@/lib/i18n/translations/mrj.json');
    case 'ms': return import('@/lib/i18n/translations/ms.json');
    case 'mt': return import('@/lib/i18n/translations/mt.json');
    case 'mus': return import('@/lib/i18n/translations/mus.json');
    case 'mwl': return import('@/lib/i18n/translations/mwl.json');
    case 'mwr': return import('@/lib/i18n/translations/mwr.json');
    case 'my': return import('@/lib/i18n/translations/my.json');
    case 'myv': return import('@/lib/i18n/translations/myv.json');
    case 'mzn': return import('@/lib/i18n/translations/mzn.json');
    case 'na': return import('@/lib/i18n/translations/na.json');
    case 'nah': return import('@/lib/i18n/translations/nah.json');
    case 'nap': return import('@/lib/i18n/translations/nap.json');
    case 'nds': return import('@/lib/i18n/translations/nds.json');
    case 'nds-nl': return import('@/lib/i18n/translations/nds-nl.json');
    case 'ne': return import('@/lib/i18n/translations/ne.json');
    case 'new': return import('@/lib/i18n/translations/new.json');
    case 'ng': return import('@/lib/i18n/translations/ng.json');
    case 'nl': return import('@/lib/i18n/translations/nl.json');
    case 'nn': return import('@/lib/i18n/translations/nn.json');
    case 'no': return import('@/lib/i18n/translations/no.json');
    case 'nov': return import('@/lib/i18n/translations/nov.json');
    case 'nrm': return import('@/lib/i18n/translations/nrm.json');
    case 'nso': return import('@/lib/i18n/translations/nso.json');
    case 'nv': return import('@/lib/i18n/translations/nv.json');
    case 'ny': return import('@/lib/i18n/translations/ny.json');
    case 'oc': return import('@/lib/i18n/translations/oc.json');
    case 'olo': return import('@/lib/i18n/translations/olo.json');
    case 'om': return import('@/lib/i18n/translations/om.json');
    case 'or': return import('@/lib/i18n/translations/or.json');
    case 'os': return import('@/lib/i18n/translations/os.json');
    case 'pa': return import('@/lib/i18n/translations/pa.json');
    case 'pag': return import('@/lib/i18n/translations/pag.json');
    case 'pam': return import('@/lib/i18n/translations/pam.json');
    case 'pap': return import('@/lib/i18n/translations/pap.json');
    case 'pcd': return import('@/lib/i18n/translations/pcd.json');
    case 'pdc': return import('@/lib/i18n/translations/pdc.json');
    case 'pfl': return import('@/lib/i18n/translations/pfl.json');
    case 'pi': return import('@/lib/i18n/translations/pi.json');
    case 'pih': return import('@/lib/i18n/translations/pih.json');
    case 'pl': return import('@/lib/i18n/translations/pl.json');
    case 'pms': return import('@/lib/i18n/translations/pms.json');
    case 'pnb': return import('@/lib/i18n/translations/pnb.json');
    case 'pnt': return import('@/lib/i18n/translations/pnt.json');
    case 'ps': return import('@/lib/i18n/translations/ps.json');
    case 'pt': return import('@/lib/i18n/translations/pt.json');
    case 'qu': return import('@/lib/i18n/translations/qu.json');
    case 'rm': return import('@/lib/i18n/translations/rm.json');
    case 'rmy': return import('@/lib/i18n/translations/rmy.json');
    case 'rn': return import('@/lib/i18n/translations/rn.json');
    case 'ro': return import('@/lib/i18n/translations/ro.json');
    case 'roa-rup': return import('@/lib/i18n/translations/roa-rup.json');
    case 'roa-tara': return import('@/lib/i18n/translations/roa-tara.json');
    case 'ru': return import('@/lib/i18n/translations/ru.json');
    case 'rue': return import('@/lib/i18n/translations/rue.json');
    case 'rw': return import('@/lib/i18n/translations/rw.json');
    case 'sa': return import('@/lib/i18n/translations/sa.json');
    case 'sah': return import('@/lib/i18n/translations/sah.json');
    case 'sat': return import('@/lib/i18n/translations/sat.json');
    case 'sc': return import('@/lib/i18n/translations/sc.json');
    case 'scn': return import('@/lib/i18n/translations/scn.json');
    case 'sco': return import('@/lib/i18n/translations/sco.json');
    case 'sd': return import('@/lib/i18n/translations/sd.json');
    case 'se': return import('@/lib/i18n/translations/se.json');
    case 'sg': return import('@/lib/i18n/translations/sg.json');
    case 'sh': return import('@/lib/i18n/translations/sh.json');
    case 'si': return import('@/lib/i18n/translations/si.json');
    case 'simple': return import('@/lib/i18n/translations/simple.json');
    case 'sk': return import('@/lib/i18n/translations/sk.json');
    case 'sl': return import('@/lib/i18n/translations/sl.json');
    case 'sm': return import('@/lib/i18n/translations/sm.json');
    case 'sn': return import('@/lib/i18n/translations/sn.json');
    case 'so': return import('@/lib/i18n/translations/so.json');
    case 'sq': return import('@/lib/i18n/translations/sq.json');
    case 'sr': return import('@/lib/i18n/translations/sr.json');
    case 'srn': return import('@/lib/i18n/translations/srn.json');
    case 'ss': return import('@/lib/i18n/translations/ss.json');
    case 'st': return import('@/lib/i18n/translations/st.json');
    case 'stq': return import('@/lib/i18n/translations/stq.json');
    case 'su': return import('@/lib/i18n/translations/su.json');
    case 'sv': return import('@/lib/i18n/translations/sv.json');
    case 'sw': return import('@/lib/i18n/translations/sw.json');
    case 'szl': return import('@/lib/i18n/translations/szl.json');
    case 'ta': return import('@/lib/i18n/translations/ta.json');
    case 'tcy': return import('@/lib/i18n/translations/tcy.json');
    case 'te': return import('@/lib/i18n/translations/te.json');
    case 'tet': return import('@/lib/i18n/translations/tet.json');
    case 'tg': return import('@/lib/i18n/translations/tg.json');
    case 'th': return import('@/lib/i18n/translations/th.json');
    case 'ti': return import('@/lib/i18n/translations/ti.json');
    case 'tk': return import('@/lib/i18n/translations/tk.json');
    case 'tl': return import('@/lib/i18n/translations/tl.json');
    case 'tn': return import('@/lib/i18n/translations/tn.json');
    case 'to': return import('@/lib/i18n/translations/to.json');
    case 'tpi': return import('@/lib/i18n/translations/tpi.json');
    case 'tr': return import('@/lib/i18n/translations/tr.json');
    case 'ts': return import('@/lib/i18n/translations/ts.json');
    case 'tt': return import('@/lib/i18n/translations/tt.json');
    case 'tum': return import('@/lib/i18n/translations/tum.json');
    case 'tw': return import('@/lib/i18n/translations/tw.json');
    case 'ty': return import('@/lib/i18n/translations/ty.json');
    case 'tyv': return import('@/lib/i18n/translations/tyv.json');
    case 'udm': return import('@/lib/i18n/translations/udm.json');
    case 'ug': return import('@/lib/i18n/translations/ug.json');
    case 'uk': return import('@/lib/i18n/translations/uk.json');
    case 'ur': return import('@/lib/i18n/translations/ur.json');
    case 'uz': return import('@/lib/i18n/translations/uz.json');
    case 've': return import('@/lib/i18n/translations/ve.json');
    case 'vec': return import('@/lib/i18n/translations/vec.json');
    case 'vep': return import('@/lib/i18n/translations/vep.json');
    case 'vi': return import('@/lib/i18n/translations/vi.json');
    case 'vls': return import('@/lib/i18n/translations/vls.json');
    case 'vo': return import('@/lib/i18n/translations/vo.json');
    case 'wa': return import('@/lib/i18n/translations/wa.json');
    case 'war': return import('@/lib/i18n/translations/war.json');
    case 'wo': return import('@/lib/i18n/translations/wo.json');
    case 'wuu': return import('@/lib/i18n/translations/wuu.json');
    case 'xal': return import('@/lib/i18n/translations/xal.json');
    case 'xh': return import('@/lib/i18n/translations/xh.json');
    case 'xmf': return import('@/lib/i18n/translations/xmf.json');
    case 'yi': return import('@/lib/i18n/translations/yi.json');
    case 'yo': return import('@/lib/i18n/translations/yo.json');
    case 'yue': return import('@/lib/i18n/translations/yue.json');
    case 'za': return import('@/lib/i18n/translations/za.json');
    case 'zea': return import('@/lib/i18n/translations/zea.json');
    case 'zh': return import('@/lib/i18n/translations/zh.json');
    case 'zh-classical': return import('@/lib/i18n/translations/zh-classical.json');
    case 'zh-min-nan': return import('@/lib/i18n/translations/zh-min-nan.json');
    case 'zh-yue': return import('@/lib/i18n/translations/zh-yue.json');
    case 'zu': return import('@/lib/i18n/translations/zu.json');
    default:
      console.warn(`No direct import for language ${lang}, falling back to dynamic import`);
      // Fallback to dynamic import with explicit vite-ignore for other languages
      return import(/* @vite-ignore */ `@/lib/i18n/translations/${lang}.json`);
  }
};

/**
 * Dynamically loads a language translation file
 */
const loadTranslation = async (lang: SupportedLanguage): Promise<Record<string, string>> => {
  if (translationCache[lang]) {
    return translationCache[lang]!;
  }
  
  try {
    console.log(`Loading translations for: ${lang}`); // Debug log
    
    // Load the appropriate module
    const module = await getTranslationModule(lang);
    translationCache[lang] = module.default || module;
    
    console.log(`Successfully loaded translations for: ${lang}`);
    return translationCache[lang]!;
  } catch (error) {
    console.error(`Failed to load translations for ${lang}:`, error);
    // Fallback to English if available, or empty object
    return translationCache['en'] || {};
  }
};

// Preload English translations as they're the default
loadTranslation('en').catch(err => console.error('Failed to preload English translations:', err));

/**
 * Sets the active language and preloads its translations
 */
export const setLanguage = async (lang: string): Promise<SupportedLanguage> => {
  console.log(`Setting language: ${lang}`); // Debug log
  
  if (lang in supportedLanguages) {
    currentLanguage = lang as SupportedLanguage;
    
    // Preload the translations for this language
    await loadTranslation(currentLanguage);
    return currentLanguage;
  }
  
  console.warn(`Language ${lang} not supported, falling back to en`);
  currentLanguage = 'en';
  await loadTranslation('en');
  return currentLanguage;
};

/**
 * Translates a key to the current language
 */
export const t = async (key: string, params?: Record<string, string | number>): Promise<string> => {
  // For English, just return the key (which is the English phrase)
  if (currentLanguage === 'en') {
    let text = key;
    
    // Handle parameter substitution
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        text = text.replace(new RegExp(`{{${param}}}`, 'g'), String(value));
      });
    }
    
    return text;
  }
  
  // Load translations if not already cached
  const translations = await loadTranslation(currentLanguage);
  
  // Look up translation in the current language
  let text = translations[key] || key;  // Fallback to the key (English) if not found
  
  // Handle parameter substitution
  if (params) {
    Object.entries(params).forEach(([param, value]) => {
      text = text.replace(new RegExp(`{{${param}}}`, 'g'), String(value));
    });
  }
  
  return text;
};

/**
 * Synchronous version of the translate function
 * Use this when you know the translation is already loaded
 */
export const tSync = (key: string, params?: Record<string, string | number>): string => {
  // For English, just return the key (which is the English phrase)
  if (currentLanguage === 'en') {
    let text = key;
    
    // Handle parameter substitution
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        text = text.replace(new RegExp(`{{${param}}}`, 'g'), String(value));
      });
    }
    
    return text;
  }
  
  // Check if we have the translations loaded
  if (!translationCache[currentLanguage]) {
    console.warn(`Translations for ${currentLanguage} not loaded yet, falling back to key`);
    return key;
  }
  
  // Look up translation in the current language
  let text = translationCache[currentLanguage]?.[key] || key;  // Fallback to the key (English) if not found
  
  // Handle parameter substitution
  if (params) {
    Object.entries(params).forEach(([param, value]) => {
      text = text.replace(new RegExp(`{{${param}}}`, 'g'), String(value));
    });
  }
  
  return text;
};

/**
 * Detects browser language and returns a supported match or fallback
 */
export const detectBrowserLanguage = (): SupportedLanguage => {
  if (typeof window === 'undefined') return 'en';
  
  const browserLang = window.navigator.language.split('-')[0];
  return browserLang in supportedLanguages ? browserLang as SupportedLanguage : 'en';
};

/**
 * Gets all available languages for UI selectors
 */
export const getAvailableLanguages = (): Array<{ code: SupportedLanguage; name: string }> => {
  return Object.entries(supportedLanguages).map(([code, name]) => ({
    code: code as SupportedLanguage,
    name
  }));
};

/**
 * Pre-loads a specific language or set of languages
 */
export const preloadTranslations = async (languages: SupportedLanguage | SupportedLanguage[]): Promise<void> => {
  const langsToLoad = Array.isArray(languages) ? languages : [languages];
  
  await Promise.all(
    langsToLoad.map(lang => loadTranslation(lang))
  );
};

/**
 * Initializes i18n with browser language or saved preference
 */
export const init = async (): Promise<SupportedLanguage> => {
  let language: SupportedLanguage = 'en';
  
  if (typeof window !== 'undefined' && window.localStorage) {
    // Check both possible storage keys
    const preferredLang = window.localStorage.getItem('preferred-language') as SupportedLanguage;
    const userLang = window.localStorage.getItem('user_language') as SupportedLanguage;
    
    language = (preferredLang && (preferredLang in supportedLanguages)) ? preferredLang :
               (userLang && (userLang in supportedLanguages)) ? userLang :
               detectBrowserLanguage();
  }
  
  return await setLanguage(language);
};

// Define the TranslationKey type for backwards compatibility
export type TranslationKey = string;

// Re-export needed types and utilities
export { 
  supportedLanguages, 
  SupportedLanguage, 
  rtlLanguages,
  getLanguageDirection 
};