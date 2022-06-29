import React from 'react'

export function CommitDetails(props: any) {

  if (props.commitData.length === 0) {
    return <div>No commit data</div>
  } else {

    // select most recent commit info
    let recentCommit = props.commitData[0]['commit'];

    return(
      <div>
        <div>Last Commit: {recentCommit['committer']['date']}</div>
        <div>Author: {recentCommit['author']['name']}</div>
        <div>Message: {recentCommit['message']}</div>
      </div>
    )
  }
}