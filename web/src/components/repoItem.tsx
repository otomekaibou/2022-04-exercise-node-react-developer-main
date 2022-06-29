import React, { useState, useEffect } from 'react';
import { CommitDetails } from './commitDetails';

export function RepoItem(props: any) {
  const [showDetails, setShowDetails] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commitData, setCommitData] = useState([]);

  let repoData = props.repoData;

  function toggleDetails() {
    setShowDetails(!showDetails);
  }

  // get commit data for this repo
  useEffect(() => {
    let mounted = true;
    fetch("https://api.github.com/repos/silverorange/" + repoData.name + "/commits", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    },)
    .then((res) => res.json())
    .then(
      (json) => {
        if (mounted) {
          setCommitData(json);
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
    return <h2 className="status-message">Retrieving data...</h2>
  } else if (error) {
    return <div className="status-message">{error}</div>
  } else {

    // sort data from most to least recent
    commitData.sort((a, b) => (a['commit']['committer']['date'] > b['commit']['committer']['date']) ? 1: -1);

    return (
      <div onClick={toggleDetails}>
        <div>Name: {repoData.name}</div>
        <div>Description: {repoData.description}</div>
        <div>Language: {repoData.language}</div>
        <div>Forks Count: {repoData.forks_count}</div>
        {showDetails ? 
          <CommitDetails commitData={commitData}/>
          :
          null
        }
      </div>
    );
  }
}
