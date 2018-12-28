import decorateMenu from './menu';
import {
  decorateTerm, mapTermsState, mapTermsDispatch, getTermGroupProps, getTermProps,
} from './term';
import decorateConfig from './configs';
import decorateTerms from './terms';
import decorateKeymaps from './keymaps';
import reduceUI from './reducers';

export { decorateMenu };
export { decorateTerm };
export { decorateKeymaps };
export { decorateConfig };
export { decorateTerms };
export { mapTermsState };
export { mapTermsDispatch };
export { getTermGroupProps };
export { getTermProps };
export { reduceUI };
