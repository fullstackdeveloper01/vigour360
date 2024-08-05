import CrudModule from '@/modules/CrudModule/CrudModule';
// import DynamicForm from '@/forms/DynamicForm';
import DoctorForm from '@/forms/DoctorForm';
import { fields } from './config';

import useLanguage from '@/locale/useLanguage';

export default function Doctors() {
  const translate = useLanguage();
  const entity = 'client';
  const searchConfig = {
    displayLabels: ['name'],
    searchFields: 'name',
  };
  const deleteModalLabels = ['name'];

  const Labels = {
    PANEL_TITLE: translate('doctors'),
    DATATABLE_TITLE: translate('doctors_list'),
    ADD_NEW_ENTITY: translate('add_new_doctors'),
    ENTITY_NAME: translate('doctors'),
  };
  const configPage = {
    entity,
    ...Labels,
  };
  const config = {
    ...configPage,
    fields,
    searchConfig,
    deleteModalLabels,
  };
  return (
    <CrudModule
      createForm={<DoctorForm fields={fields} />}
      updateForm={<DoctorForm fields={fields} />}
      config={config}
    />
  );
}
