import React, { useState, useEffect } from 'react';
import { RepoItem } from './repoItem';

export function RepositoryContainer() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [repoData, setRepoData] = useState([]);

  // API call
  useEffect(() => {
    fetch("http://localhost:4000/repos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': 'http://localhost:3000',
      }
    },)
    .then((res) => res.json())
    .then(
      (json) => {
        setRepoData(json);
        setLoading(false);
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );
    return;
  }, []);

  if (loading) {
    return <h2 className="status-message">Retrieving data...</h2>
  } else if (error) {
    return <div className="status-message">{error}</div>
  } else if (repoData.length === 0) {
    return <h2 className="status-message">No data</h2>
  } else {

    console.log(repoData)
    repoData.sort((a, b) => (b['created_at'] > a['created_at']) ? 1: -1);
    console.log(repoData)

    return (
      <React.Fragment>
        {repoData.map(repo => {
            return <RepoItem repoData={repo} />
          })
        }
      </React.Fragment>
    );
  }
}
