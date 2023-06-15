const [currentLocation, setCurrentLocation] = useState(null);

useEffect(() => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCurrentLocation({ latitude, longitude });
            },
            (error) => {
                console.log(error);
                // Handle error if user denies access to location or if location retrieval fails
            }
        );
    } else {
        console.log('Geolocation is not supported by this browser.');
        // Handle the case when the browser doesn't support Geolocation API
    }
}, []);
console.log(currentLocation);