import { useMemo, useState } from "react";

export function useFilter(items, { keywordFields = [], filters = {} } = {}) {
  const [keyword, setKeyword] = useState("");
  const [filterValues, setFilterValues] = useState(() => {
    const initial = {};
    Object.keys(filters).forEach((key) => {
      initial[key] = "";
    });
    return initial;
  });

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (keyword && keywordFields.length > 0) {
        const haystack = keywordFields
          .map((field) => (item[field] != null ? String(item[field]) : ""))
          .join("")
          .toLowerCase();
        if (!haystack.includes(keyword.toLowerCase())) {
          return false;
        }
      }

      for (const key of Object.keys(filters)) {
        const value = filterValues[key];
        if (value && item[key] !== value) {
          return false;
        }
      }

      return true;
    });
  }, [items, keyword, keywordFields, filters, filterValues]);

  const setFilter = (key, value) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setKeyword("");
    const reset = {};
    Object.keys(filters).forEach((key) => {
      reset[key] = "";
    });
    setFilterValues(reset);
  };

  return {
    keyword,
    setKeyword,
    filterValues,
    setFilter,
    resetFilters,
    filtered,
  };
}
