import React, { useState, useEffect } from 'react';

export function ReadMeContainer(props: any) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [readMeData, setReadMeData] = useState(null);

  // get readme for this repo
  useEffect(() => {
    let mounted = true;
    // fetch("https://raw.githubusercontent.com/" + props.fullName + "/master/README.md", {
    fetch("https://raw.githubusercontent.com/silverorange/accessible-google-places-autocomplete/master/README.md", {
      method: "GET",
      // headers: {
      //   "Content-Type": "application/json",
      // }
    },)
    .then((res) => console.log(res))
    .then(
      (text) => {
        if (mounted) {
          console.log(text);
          console.log()
          // setReadMeData(json);
          setLoading(false);
        }
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );
    mounted = false;
    setLoading(false);
    return;
  }, []);

  if (loading) {
    return <div className="status-message">Retrieving data...</div>
  } else if (error) {
    // TODO: fix error display
    return <div className="status-message">ERROR</div>
  } else if (!readMeData) {
    return (
      <div>
        404
      </div>
    )
  }  else {
    return (
      <div>
        SUCCESS
      </div>
    )
  }
}