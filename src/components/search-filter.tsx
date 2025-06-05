import { Button, Fieldset, Select, Switch, TextInput } from "@mantine/core";
import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  COLUMNS,
  RES_VALUES,
  type SearchFilterDTO,
} from "~/dto/search-filter-dto";
import { usePendingForm } from "~/hooks/usePendingForm";

export const SearchFilterUI = () => {
  const goto = useNavigate();
  const { onSubmit } = usePendingForm<SearchFilterDTO>(async (_, search) => {
    goto({ search, to: "/search" });
  });
  return (
    <search>
      <form onSubmit={onSubmit}>
        <FieldSetWithin />
      </form>
    </search>
  );
};

const FieldSetWithin = () => {
  const search = useSearch({
    from: "/search/",
  });

  return (
    <Fieldset className="p-8 grid sm:grid-cols-2 gap-x-6">
      <div className="space-y-6">
        <TextInput
          name="req"
          defaultValue={search.req}
          minLength={4}
          label="Search Query"
          description="The text to search in Search Column"
          placeholder="Pride and Prejudice"
          required
        />

        <Select
          name="column"
          defaultValue={search.column}
          label="Search Column"
          description="The column to search by"
          data={COLUMNS}
          allowDeselect={false}
        />
      </div>

      <div className="space-y-6">
        <Select
          name="sort"
          defaultValue={search.sort}
          label="Sort By"
          description="The column to sort by"
          data={COLUMNS}
          allowDeselect={false}
        />
        <Switch
          name="sortmode"
          defaultChecked={search.sortmode === "DESC"}
          label="Descending"
          value={"DESC"}
        />
        <Select
          name="res"
          defaultValue={search.res}
          label="Results per Page"
          data={RES_VALUES}
          allowDeselect={false}
        />
      </div>

      <div>
        <Button
          loaderProps={{ type: "dots" }}
          className="w-full mt-6 sm:-mt-4"
          size="md"
          type="submit"
        >
          Search
        </Button>
      </div>
    </Fieldset>
  );
};
