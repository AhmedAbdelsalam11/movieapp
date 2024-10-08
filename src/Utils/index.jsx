export const AddMovieToWatch = (MovieItem = {}, ListMovieItems = []) => {
    const existItem = ListMovieItems.find(item => item.id === MovieItem.id);

    if (existItem) {
        
        return ListMovieItems.map((item) =>
            item.id === MovieItem.id ? { ...item, Quantity: item.Quantity + 1 } : item
        );
    }

   
    return [...ListMovieItems, { ...MovieItem, Quantity: 1 }];
};