import React, { useState } from 'react';
import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { colors } from '../../../Data/Filter/Colors';
import { price } from '../../../Data/Filter/Price';
import { discount } from '../../../Data/Filter/Discount';
import { useSearchParams } from 'react-router-dom';

const FilterSection = () => {
  const [expandColor, setExpandColor] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleExpandColor = () => {
    setExpandColor(!expandColor);
  };

  const updateFilterParams = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (value) {
      searchParams.set(name, value);
    } else {
      searchParams.delete(name);
    }
    setSearchParams(searchParams);
  };

  const clearAllFilter = () => {
    searchParams.forEach((_, key) => {
      searchParams.delete(key);
    });
    setSearchParams(searchParams);
  };

  return (
    <div className="-z-20 space-y-5 bg-white">
      <div className="flex items-center justify-between h-[40px] px-9 lg:border-r">
        <p className="text-lg font-semibold">Filters</p>
        <Button
          onClick={clearAllFilter}
          size="small"
          className="text-teal-600 font-semibold cursor-pointer"
        >
          Clear All
        </Button>
      </div>

      <Divider />

      <div className="px-9 space-y-6">
        {/* Colors Filter */}
        <section>
          <FormControl>
            <FormLabel
              sx={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: 'teal[500]',
                pb: '14px',
              }}
              className="font-semibold text-2xl"
            >
              Colors
            </FormLabel>
            <RadioGroup
              aria-labelledby="color"
              onChange={updateFilterParams}
              defaultValue=""
              name="color"
            >
              {colors
                .slice(0, expandColor ? colors.length : 5)
                .map((item) => (
                  <FormControlLabel
                    key={item.name}
                    value={item.name}
                    control={<Radio />}
                    label={
                      <div className="flex gap-3 items-center">
                        <p>{item.name}</p>
                        <div
                          style={{ backgroundColor: item.hex }}
                          className={`h-5 w-5 rounded-full ${
                            item.name === 'white' ? 'border' : ''
                          }`}
                        />
                      </div>
                    }
                  />
                ))}
            </RadioGroup>
          </FormControl>
          <Button
            onClick={handleExpandColor}
            className="text-primary-color hover:text-teal-900 cursor-pointer"
          >
            {expandColor ? 'Hide' : `+${colors.length - 5} more`}
          </Button>
        </section>

        {/* Price Filter */}
        <section>
          <FormControl>
            <FormLabel
              sx={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: 'teal[500]',
                pb: '14px',
              }}
              className="font-semibold text-2xl"
            >
              Price
            </FormLabel>
            <RadioGroup
              aria-labelledby="price"
              onChange={updateFilterParams}
              defaultValue=""
              name="price"
            >
              {price.map((item) => (
                <FormControlLabel
                  key={item.name}
                  value={item.value}
                  control={<Radio size="small" />}
                  label={item.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </section>

        {/* Discount Filter */}
        <section>
          <FormControl>
            <FormLabel
              sx={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: 'teal[500]',
                pb: '14px',
              }}
              className="font-semibold text-2xl"
            >
              Discount
            </FormLabel>
            <RadioGroup
              aria-labelledby="discount"
              onChange={updateFilterParams}
              defaultValue=""
              name="discount"
            >
              {discount.map((item) => (
                <FormControlLabel
                  key={item.name}
                  value={item.value}
                  control={<Radio size="small" />}
                  label={item.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </section>
      </div>
    </div>
  );
};

export default FilterSection;
