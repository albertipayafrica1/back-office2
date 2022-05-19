import React, { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  Popper,
  Paper,
  MenuItem,
  MenuList,
  Typography,
  Stack,
} from "@mui/material";

import debounce from "lodash/debounce";
import Loader from "../Loader";
import AutoComplete from "./AutoComplete";
import fetchData from "./fetchData";
import useFetch from "./useFetch";

const renderItem = ({ item, style, uniKey }) => {
  return item ? (
    <Link href={item[uniKey]} key={item[uniKey]}>
      <MenuItem component="div" key={item[uniKey]} style={style}>
        {item[uniKey]}
      </MenuItem>
    </Link>
  ) : null;
};
const renderItemList = ({ items, loading, err, uniKey }) => {
  if (loading)
    return (
      <Stack direction="row" justifyContent="center" alignItems="center">
        <Typography component="em">
          <Loader spaceAround="xs" />
        </Typography>
      </Stack>
    );
  if (err)
    return (
      <Stack direction="row" justifyContent="center" alignItems="center">
        <Typography component="em">{err.message}</Typography>
      </Stack>
    );
  if (items.length === 0)
    return (
      <Stack direction="row" justifyContent="center" alignItems="center">
        <Typography component="em">
          We couldnt find anything matching your search.
        </Typography>
      </Stack>
    );
  return items.map((item, index) =>
    item
      ? renderItem({
          item,
          index,
          style: {
            fontWeight: "normal",
          },
          uniKey,
        })
      : null
  );
};
const Search = () => {
  const router = useRouter();
  const [{ items, error }, setListData] = useState({
    items: [],
    error: null,
  });
  const onSuccess = useCallback((data) => {
    setListData({ items: data, error: null });
  }, []);
  const onError = useCallback((err) => {
    setListData({ items: [], error: err });
  }, []);
  const { loading, setParams } = useFetch({ fetchData, onSuccess, onError });
  const onInputValueChange = useCallback(
    debounce((inputValue) => {
      setParams({ query: inputValue });
      router.push(`${router.pathname}?search=${inputValue}`, undefined, {
        shallow: true,
      });
    }, 300)
  );
  return (
    <AutoComplete
      items={items}
      loading={loading}
      error={error}
      onInputValueChange={onInputValueChange}
      itemToString={(item) => (item ? item.value : "")}
      uniKey="value"
    >
      {({ isOpen, anchorEl, uniKey }) => {
        return isOpen ? (
          <Popper open={isOpen} anchorEl={anchorEl} disablePortal>
            <Paper
              square
              style={{
                width: anchorEl ? anchorEl.clientWidth + 10 : null,
              }}
            >
              <MenuList>
                {renderItemList({
                  items,
                  loading,
                  err: error,
                  uniKey,
                })}
              </MenuList>
            </Paper>
          </Popper>
        ) : (
          <div />
        );
      }}
    </AutoComplete>
  );
};

export default Search;
