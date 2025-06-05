import type { ZodIssue } from "zod";
import type { SearchFilterDTO } from "~/dto/search-filter-dto";
import type { QueryLibgenReturn } from "~/server/utils/libgen-next";

export const apiUrl = import.meta.env.DEV
  ? `http://localhost:3000/api`
  : `/api`;

class API {
  private async bring(str: string) {
    const res = await fetch(`${apiUrl}${str}`);
    const output = await res.json();
    return output;
  }
  async libgen(data: SearchFilterDTO) {
    const query = new URLSearchParams(data).toString();
    return (await this.bring("/libgen?" + query)) as
      | {
          data: QueryLibgenReturn[];
          success: true;
        }
      | {
          success: false;
          error: ZodIssue[];
        };
  }
}

export const Api = new API();
