import React from 'react';
import LyricsListView from '../components/lyricsListView';
import hymnsList from "../assets/hymnsList.json";


const SetListPage = () => {
  return (
    <div>
      {/* <LyricsListView allSongs={hymnsList} /> */}
      <LyricsListView />
    </div>
  );
};

export default SetListPage;