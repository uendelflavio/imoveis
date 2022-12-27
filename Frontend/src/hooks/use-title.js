import React from "react";
//~ uso: useTitle(`Spotify - ${artist.name}`);
function useTitle(newTitle) {
  const [title, setTitle] = React.useState(document.title);

  React.useEffect(
    () => {
      if (newTitle && !newTitle.includes("undefined")) {
        setTitle(newTitle);
        document.title = title;
      }
    },
    [title, newTitle]
  );
}

export default useTitle;
