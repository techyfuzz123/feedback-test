async function UseFetch(method, route, body) {
  let url;
  let EXTERNAL_CLIENT = process.env.NEXT_PUBLIC_EXTERNAL_CLIENT === "true";

  if (EXTERNAL_CLIENT) {
    url = process.env.NEXT_PUBLIC_BASE_URL;
  } else {
    url = "/api";
  }

  let config = {
    method: "GET",
    credentials: "include",
  };

  if (method === "POST") {
    config = {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };
  }
  const response = await fetch(url + route, config).then(async function (res) {
    const status = res.status;
    const data = await res.json();
    return {
      data,
      status,
    };
  });
  return response;
}

export default UseFetch;
