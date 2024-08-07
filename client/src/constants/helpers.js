export const handlerErrors = (err) => {
  console.log("err===+>", err)
  if (!!err?.response?.data?.error) {
    return err?.response?.data?.error;
  }

  if (err?.error) {
    return err?.error;
  }

  if (err?.data?.error) {
    return err?.data?.error;
  }

  if (!!err?.message) {
    return err?.message;
  }

  return "something went wrong, Please try again after sometime.";
};

export const destroyToken = (navigate) => {
  localStorage.removeItem("token");
  navigate(`/login`);
};

export const getFullName = (data) => {
  return (data?.firstName || "N/A") + " " + (data?.lastName || "N/A");
};

export const truncate = (str, len, cutLen) => {
  return str?.length > len ? str.substring(0, cutLen) + "..." : str;
};

export const formatWithLabel = (data = []) => {
  return data.map((l) => {
    return {
      label: l.name,
      value: l?._id,
    };
  });
};
