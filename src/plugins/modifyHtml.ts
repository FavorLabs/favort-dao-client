import { IApi } from 'umi';

export default (api: IApi) => {
  api.modifyHTML(($) => {
    $('html').attr('manifest', 'appcache.manifest');
    return $;
  });
};
