export function fetchPictures() {
  fetch(
    `https://pixabay.com/api/?key=29432159-064ba5645d6ae7f18ff2bb6d2&q&image_type=photo&orientation=horizontal&safesearch=true`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}
