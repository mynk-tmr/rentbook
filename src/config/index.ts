import type { SearchFilterDTO } from "~/dto/search-filter-dto";
import type { ServerResponse } from "~/server";

export const apiUrl = import.meta.env.DEV
  ? `http://localhost:3000/api`
  : `/api`;

class API {
  private async bring(str: string) {
    let res;
    try {
      res = await fetch(`${apiUrl}${str}`);
      const output = await res.json();
      return output;
    } catch (err) {
      throw new TypeError(
        "Server didn't send JSON format. Status : " + res?.status || ""
      );
    }
  }
  async libgen(data: SearchFilterDTO): ServerResponse {
    const query = new URLSearchParams(data).toString();
    return await this.bring("/libgen?" + query);
  }
}

export const Api = new API();
