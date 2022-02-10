import { isIterable } from 'rxjs/internal-compatibility';
import * as moment from 'moment-timezone';
import { ReportSchemaResponse } from '../types/response/report-schema.response';
import {
  BasicUserResponse,
  FromPermissions,
  UserResponse,
} from '../types/response/user.response';
import { PaginateResponse } from '../types/response/paginate.response';
import { BasicReportResponse } from '../types/response/report.response';
import { ManualResponse } from '../types/response/manual-response';
import { BasicAnswerResponse } from '../types/response/answer.response';
import { CategoryResponse } from '../types/response/category.response';
import { ContactResponse } from '../types/response/contact.response';
import { CountryResponse } from '../types/response/country.response';
import { CustomerResponse } from '../types/response/customer.response';
import { DelayResponse } from '../types/response/delay.response';
import { GeneratorResponse } from '../types/response/generator.response';
import { LocationResponse } from '../types/response/location.response';
import { MotorResponse } from '../types/response/motor.response';
import { QTAResponse } from '../types/response/qta.response';
import { TypeResponse } from '../types/response/type.response';
import { UnitResponse } from '../types/response/unit.response';
export class TypeBuilder {
  public static async basicAnswer(
    data: any
  ): Promise<BasicAnswerResponse | null> {
    if (data) {
      return {
        id: data.id,
        formId: data.form_id,
        userId: data.user_id,
        countryId: data.country_id,
        reportType: data.report_type,
        folio: data.folio,
        createdAt: data.created_at ? moment(data.created_at) : null,
        updatedAt: data.updated_at ? moment(data.updated_at) : null,
      };
    }
    return null;
  }
  public static async basicAnswers(
    data: any[]
  ): Promise<BasicAnswerResponse[]> {
    return await TypeBuilder.arrayBuilder<BasicAnswerResponse>(
      data,
      TypeBuilder.basicAnswer
    );
  }
  public static async category(data: any): Promise<CategoryResponse | null> {
    if (data) {
      return {
        id: data.id,
        name: data.name,
        status: data.status === true,
        createdAt: data.created_at ? moment(data.created_at) : null,
        updatedAt: data.updated_at ? moment(data.updated_at) : null,
      };
    }
    return null;
  }
  public static async categories(data: any[]): Promise<CategoryResponse[]> {
    return await TypeBuilder.arrayBuilder<CategoryResponse>(
      data,
      TypeBuilder.category
    );
  }
  public static async contact(data: any): Promise<ContactResponse | null> {
    if (data) {
      return {
        id: data.id,
        name: data.name,
        department: data.department,
        email: data.email,
        locationId: data.locationId,
        phone: data.phone,
        position: data.position,
        createdAt: data.created_at ? moment(data.created_at) : null,
        updatedAt: data.updated_at ? moment(data.updated_at) : null,
      };
    }
    return null;
  }
  public static async contacts(data: any[]): Promise<ContactResponse[]> {
    return await TypeBuilder.arrayBuilder<ContactResponse>(
      data,
      TypeBuilder.contact
    );
  }
  public static async country(data: any): Promise<CountryResponse | null> {
    if (data) {
      return {
        id: data.id,
        name: data.name,
        countryCode: data.countryCode,
        createdAt: data.created_at ? moment(data.created_at) : null,
        updatedAt: data.updated_at ? moment(data.updated_at) : null,
      };
    }
    return null;
  }
  public static async countries(data: any[]): Promise<CountryResponse[]> {
    return await TypeBuilder.arrayBuilder<CountryResponse>(
      data,
      TypeBuilder.country
    );
  }
  public static async customer(data: any): Promise<CustomerResponse | null> {
    if (data) {
      return {
        id: data.id,
        name: data.name,
        phone: data.phone,
        countryId: data.countryId,
        address: data.address,
        createdAt: data.created_at ? moment(data.created_at) : null,
        updatedAt: data.updated_at ? moment(data.updated_at) : null,
      };
    }
    return null;
  }
  public static async customers(data: any[]): Promise<CustomerResponse[]> {
    return await TypeBuilder.arrayBuilder<CustomerResponse>(
      data,
      TypeBuilder.customer
    );
  }
  public static async delay(data: any): Promise<DelayResponse | null> {
    if (data) {
      return {
        id: data.id,
        name: data.name,
        status: data.status === true,
        createdAt: data.created_at ? moment(data.created_at) : null,
        updatedAt: data.updated_at ? moment(data.updated_at) : null,
      };
    }
    return null;
  }
  public static async delays(data: any[]): Promise<DelayResponse[]> {
    return await TypeBuilder.arrayBuilder<DelayResponse>(
      data,
      TypeBuilder.delay
    );
  }
  public static async generator(data: any): Promise<GeneratorResponse | null> {
    if (data) {
      return {
        id: data.id,
        name: data.name,
        status: data.status === true,
        createdAt: data.created_at ? moment(data.created_at) : null,
        updatedAt: data.updated_at ? moment(data.updated_at) : null,
      };
    }
    return null;
  }
  public static async generators(data: any[]): Promise<GeneratorResponse[]> {
    return await TypeBuilder.arrayBuilder<GeneratorResponse>(
      data,
      TypeBuilder.generator
    );
  }
  public static async location(data: any): Promise<LocationResponse | null> {
    if (data) {
      return {
        id: data.id,
        name: data.name,
        address: data.address,
        countryId: data.countryId,
        city: data.city,
        customerId: data.customerId,
        createdAt: data.created_at ? moment(data.created_at) : null,
        updatedAt: data.updated_at ? moment(data.updated_at) : null,
      };
    }
    return null;
  }
  public static async locations(data: any[]): Promise<LocationResponse[]> {
    return await TypeBuilder.arrayBuilder<LocationResponse>(
      data,
      TypeBuilder.location
    );
  }
  public static async motor(data: any): Promise<MotorResponse | null> {
    if (data) {
      return {
        id: data.id,
        name: data.name,
        status: data.status === true,
        createdAt: data.created_at ? moment(data.created_at) : null,
        updatedAt: data.updated_at ? moment(data.updated_at) : null,
      };
    }
    return null;
  }
  public static async motors(data: any[]): Promise<MotorResponse[]> {
    return await TypeBuilder.arrayBuilder<MotorResponse>(
      data,
      TypeBuilder.motor
    );
  }
  public static async qta(data: any): Promise<QTAResponse | null> {
    if (data) {
      return {
        id: data.id,
        name: data.name,
        status: data.status === true,
        createdAt: data.created_at ? moment(data.created_at) : null,
        updatedAt: data.updated_at ? moment(data.updated_at) : null,
      };
    }
    return null;
  }
  public static async qtas(data: any[]): Promise<QTAResponse[]> {
    return await TypeBuilder.arrayBuilder<QTAResponse>(data, TypeBuilder.qta);
  }
  public static async type(data: any): Promise<TypeResponse | null> {
    if (data) {
      return {
        id: data.id,
        name: data.name,
        status: data.status === true,
        createdAt: data.created_at ? moment(data.created_at) : null,
        updatedAt: data.updated_at ? moment(data.updated_at) : null,
      };
    }
    return null;
  }
  public static async types(data: any[]): Promise<TypeResponse[]> {
    return await TypeBuilder.arrayBuilder<TypeResponse>(data, TypeBuilder.type);
  }
  public static async unit(data: any): Promise<UnitResponse | null> {
    if (data) {
      return {
        id: data.id,
        name: data.name,
        status: data.status === true,
        createdAt: data.created_at ? moment(data.created_at) : null,
        updatedAt: data.updated_at ? moment(data.updated_at) : null,
      };
    }
    return null;
  }
  public static async units(data: any[]): Promise<UnitResponse[]> {
    return await TypeBuilder.arrayBuilder<UnitResponse>(data, TypeBuilder.unit);
  }
  public static async basicUser(data: any): Promise<BasicUserResponse | null> {
    if (data) {
      return {
        id: data.id,
        name: data.name,
        phone: data.phone,
        countryId: data.countryId,
        email: data.email,
        sitio: data.sitio,
        wwid: data.wwid,
        formPermissions: await TypeBuilder.userFromPermissions(data.form ? JSON.parse(data.form) : null),
        createdAt: data.created_at ? moment(data.created_at) : null,
        updatedAt: data.updated_at ? moment(data.updated_at) : null,
      };
    }
    return null;
  }
  public static async basicUsers(data: any[]): Promise<BasicUserResponse[]> {
    return await TypeBuilder.arrayBuilder<BasicUserResponse>(
      data,
      TypeBuilder.basicUser
    );
  }

  public static async manual(data: any): Promise<ManualResponse | null> {
    if (data) {
      return {
        id: data.id,
        name: data.name,
        url: data.url,
        createdAt: data.created_at ? moment(data.created_at) : null,
        updatedAt: data.updated_at ? moment(data.updated_at) : null,
      };
    }
    return null;
  }
  public static async manuals(data: any[]): Promise<ManualResponse[]> {
    return await TypeBuilder.arrayBuilder<ManualResponse>(
      data,
      TypeBuilder.manual
    );
  }
  public static async reportSchema(
    data: any
  ): Promise<ReportSchemaResponse | null> {
    if (data) {
      return {
        es: data.es,
        pt: data.pt,
      };
    }
    return null;
  }
  public static async reportSchemas(
    data: any[]
  ): Promise<ReportSchemaResponse[]> {
    return await TypeBuilder.arrayBuilder<ReportSchemaResponse>(
      data,
      TypeBuilder.reportSchema
    );
  }
  public static async user(data: any): Promise<UserResponse | null> {
    if (data) {
      return {
        id: data.id,
        name: data.name,
        wwid: data.wwid,
        passwordChanged: data.change_pass === true,
        formPermissions: await TypeBuilder.userFromPermissions(data.form ? JSON.parse(data.form) : null),
        createdAt: data.created_at ? moment(data.created_at) : null,
        updatedAt: data.updated_at ? moment(data.updated_at) : null,
      };
    }
    return null;
  }
  public static async users(data: any[]): Promise<UserResponse[]> {
    return await TypeBuilder.arrayBuilder<UserResponse>(data, TypeBuilder.user);
  }
  public static async basicReport(
    data: any
  ): Promise<BasicReportResponse | null> {
    if (data) {
      return {
        id: data.id,
        folio: data.folio,
        form: data.form,
        createdAt: data.created_at ? moment(data.created_at) : null,
      };
    }
    return null;
  }
  public static async basicReports(
    data: any[]
  ): Promise<BasicReportResponse[]> {
    return await TypeBuilder.arrayBuilder<BasicReportResponse>(
      data,
      TypeBuilder.basicReport
    );
  }

  public static async userFromPermissions<T>(
    data: any
  ): Promise<FromPermissions> {
    let jsa = false;
    let service = false;
    let ingersollRand = false;
    if (data) {
      jsa = data.jsa === true;
      service = data.service === true;
      ingersollRand = data.ingersollRand === true;
    }
    return {
      jsa,
      service,
      ingersollRand,
    };
  }

  public static async paginate<TModel>(
    paginateData: any,
    functionData: (data: any[]) => Promise<TModel[]>
  ): Promise<PaginateResponse<TModel>> {
    const paginate: PaginateResponse<TModel> = {
      page: 0,
      total: 0,
      pages: 0,
      perPage: 0,
      data: [],
    };
    if (paginateData) {
      paginate.page = paginateData.current_page;
      paginate.total = paginateData.total;
      paginate.pages =
        paginateData.per_page < 1 || paginateData.total < 1
          ? 0
          : Math.floor(paginateData.total / paginateData.per_page) +
            (paginateData.total % paginateData.per_page !== 0 ? 1 : 0);
      paginate.perPage = paginateData.per_page;
      paginate.data = await functionData(paginateData.data);
    }
    return paginate;
  }
  public static async arrayBuilder<T>(
    data: any[],
    fn: (dt: any) => Promise<T | null>
  ): Promise<T[]> {
    const result: T[] = [];
    if (!data || !isIterable(data)) {
      return [];
    }
    for (const item of data) {
      const objectType = await fn(item);
      if (objectType != null) {
        result.push(objectType);
      }
    }
    return result;
  }
}
