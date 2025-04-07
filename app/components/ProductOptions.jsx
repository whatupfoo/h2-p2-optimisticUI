import { Link, useLocation, useSearchParams } from '@remix-run/react';
import { useEffect } from 'react';

export default function ProductOptions({ options }) {
  // pathname and search will be used to build option URLs
  const { pathname, search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // This effect will run whenever the search parameters change
  }, [searchParams]);

  return (
    <div className="grid gap-4 mb-6">
      {/* Each option will show a label and option value <Links> */}
      {options.map((option) => {
        if (!option.optionValues.length) {
          return null;
        }
        // get the currently selected option value
        const currentOptionVal = searchParams.get(option.name);
        return (
          <div
            key={option.name}
            className="flex flex-col flex-wrap mb-4 gap-y-2 last:mb-0"
          >
            <h3 className="whitespace-pre-wrap max-w-prose font-bold text-lead min-w-[4rem]">
              {option.name}
            </h3>

            <div className="flex flex-wrap items-baseline gap-4">
              {option.optionValues.map((value) => {
                // Build a URLSearchParams object from the current search string
                const linkParams = new URLSearchParams(search);
                // Set the option name and value, overwriting any existing values
                const isSelected = currentOptionVal === value.name;
                linkParams.set(option.name, value.name);
                return (
                  <Link
                    key={value.name}
                    to={`${pathname}?${linkParams.toString()}`}
                    preventScrollReset
                    replace
                    className={`leading-none py-1 border-b-[1.5px] cursor-pointer hover:no-underline transition-all duration-200 ${
                      isSelected ? 'border-gray-500 underline' : 'border-neutral-50 no-underline'
                    }`}
                  >
                    {value.name}
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}