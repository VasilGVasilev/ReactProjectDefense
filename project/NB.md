useEffect is outside the control flow (executes after initial render)

useEffect will render the function it contains only after the initial render is committed to the screen, thus, if you rely on data to be fetched and implemented on that intial render, the website will error, a way around the problem is '?.':

game.date -> game?.date
