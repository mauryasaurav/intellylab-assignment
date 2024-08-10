export const handlerErrors = (err) => {
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
  return (data?.first_name || "N/A") + " " + (data?.last_name || "N/A");
};

export const truncate = (str, len, cutLen) => {
  return str?.length > len ? str.substring(0, cutLen) + "..." : str;
};
