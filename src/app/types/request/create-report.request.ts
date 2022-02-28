/* eslint-disable @typescript-eslint/naming-convention */
export interface CreateReportRequest {
  answer: { [q: string]: any };
  form_name:
      'jsa_sitio'
    | 'jsa_field_generic'
    | 'jsa_field_power_gen'
    | 'jsa_field_marine'
    | 'warehouse'
    | 'service_generic'
    | 'service_maintenance'
    | 'rot_contact_rotary'
    | 'rot_oil_free_sierra'
    | 'hl_eh_hb'
    | 'rot_contact_nirvana'
    | 'rot_oil_free_nirvana'
    | 'refrigerated';
  locale: 'es' | 'pt';
}
