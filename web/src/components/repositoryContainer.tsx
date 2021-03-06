import React, { useState, useEffect } from 'react';
import { RepoItem } from './repoItem';

export function RepositoryContainer() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allRepoData, setAllRepoData] = useState([]);
  const [displayLanguage, setDisplayLanguage] = useState(null);
  const [displayRepoData, setDisplayRepoData] = useState([]);

 function filterLanguage(value: any) {
  setDisplayLanguage(value.target.value);
 }

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
        setAllRepoData(json);
        setDisplayRepoData(json);
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
  } else if (allRepoData.length === 0) {
    return <h2 className="status-message">No data</h2>
  } else {

    allRepoData.sort((a, b) => (b['created_at'] > a['created_at']) ? 1: -1);

    return (
      <React.Fragment>
        {allRepoData.map(repo => {
          return <input type="button" value={repo['language']} onClick={filterLanguage}/>
        })}
        { displayLanguage ? displayRepoData.filter(repo => 
        repo['language'] === displayLanguage).map(repo => {
          return <RepoItem repoData={repo} />
        })
        :
        displayRepoData.map(repo => {
            return <RepoItem repoData={repo} />
          })
        }
      </React.Fragment>
    );
  }
}
