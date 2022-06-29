import React, { useState, useEffect } from 'react';

export function RepoItem(props: any) {

    return (
      <div>
        <div>Name: {props.repoData.name}</div>
        <div>Description: {props.repoData.description}</div>
        <div>Language: {props.repoData.language}</div>
        <div>Forks Count: {props.repoData.forks_count}</div>
      </div>
    );
}
