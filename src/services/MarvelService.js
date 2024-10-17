import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const { loading, request, error, clearError } = useHttp();

   const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
   const _apiKey = 'apikey=2d52357d6dcd674350fed1e75564f923';
   const _baseOffset = 210;

    //for work without internet
    const dataArray = [ 
        {
            name: "Captain Flint",
            description: "",
            thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.undefined",
            homepage: "http://marvel.com/characters/384/captain_flint?utm_campaign=apiRef&utm_source=2d52357d6dcd674350fed1e75564f923",
            wiki: "http://marvel.com/comics/characters/1011196/captain_flint?utm_campaign=apiRef&utm_source=2d52357d6dcd674350fed1e75564f923",
            id: 1011196,
            comics: []
        },
        {
            name: "Captain Marvel (Carol Danvers)",
            description: "",
            thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/6/80/5269608c1be7a.undefined",
            homepage: "http://marvel.com/characters/9/captain_marvel?utm_campaign=apiRef&utm_source=2d52357d6dcd674350fed1e75564f923",
            wiki: "http://marvel.com/universe/Ms._Marvel_(Carol_Danvers)?utm_campaign=apiRef&utm_source=2d52357d6dcd674350fed1e75564f923",
            id: 1010338,
            comics: []
        },
        {
            name: "Captain Marvel (Genis-Vell)",
            description: "",
            thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.undefined",
            homepage: "http://marvel.com/characters/9/captain_marvel?utm_campaign=apiRef&utm_source=2d52357d6dcd674350fed1e75564f923",
            wiki: "http://marvel.com/universe/Photon_(Genis-Vell)?utm_campaign=apiRef&utm_source=2d52357d6dcd674350fed1e75564f923",
            id: 1011096,
            comics: []
        },
        {
            name: "Captain Marvel (Mar-Vell)",
            description: "",
            thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/f/60/526032048d1a1.undefined",
            homepage: "http://marvel.com/characters/1009224/captain_marvel_mar-vell/featured?utm_campaign=apiRef&utm_source=2d52357d6dcd674350fed1e75564f923",
            wiki: "http://marvel.com/universe/Captain_Marvel_(Mar-Vell)?utm_campaign=apiRef&utm_source=2d52357d6dcd674350fed1e75564f923",
            id: 1009224,
            comics: []
        },
        {
            name: "Captain Marvel (Monica Rambeau)",
            description: "",
            thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/9/00/4c0030bee8c86.undefined",
            homepage: "http://marvel.com/characters/9/captain_marvel?utm_campaign=apiRef&utm_source=2d52357d6dcd674350fed1e75564f923",
            wiki: "http://marvel.com/universe/Rambeau,%20Monica?utm_campaign=apiRef&utm_source=2d52357d6dcd674350fed1e75564f923",
            id: 1011095,
            comics: []
        },
        {
            name: "Captain Marvel (Phyla-Vell)",
            description: "",
            thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/5/a0/4c0030bc4629e.undefined",
            homepage: "http://marvel.com/characters/9/captain_marvel?utm_campaign=apiRef&utm_source=2d52357d6dcd674350fed1e75564f923",
            wiki: "http://marvel.com/universe/Quasar_(Phyla-Vell)?utm_campaign=apiRef&utm_source=2d52357d6dcd674350fed1e75564f923",
            id: 1011097
        },
        {
            name: "Captain Midlands",
            description: "",
            thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.undefined",
            homepage: "http://marvel.com/characters/386/captain_midlands?utm_campaign=apiRef&utm_source=2d52357d6dcd674350fed1e75564f923",
            wiki: "http://marvel.com/universe/Captain_Midlands?utm_campaign=apiRef&utm_source=2d52357d6dcd674350fed1e75564f923",
            id: 1011355,
            comics: []
        },
        {
            name: "Captain Stacy",
            description: "NYPD Captain George Stacy was the father of one-time Peter Parker girlfriend Gwen Stacy.",
            thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/2/a0/4c00407752be2.undefined",
            homepage: "http://marvel.com/characters/390/captain_stacy?utm_campaign=apiRef&utm_source=2d52357d6dcd674350fed1e75564f923",
            wiki: "http://marvel.com/universe/Stacy%2C_George?utm_campaign=apiRef&utm_source=2d52357d6dcd674350fed1e75564f923",
            id: 1009225,
            comics: []
        },
        {
            name: "Captain Universe",
            description: "",
            thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/4/c0/4c00324c12ba2.undefined",
            homepage: "http://marvel.com/characters/392/captain_universe?utm_campaign=apiRef&utm_source=2d52357d6dcd674350fed1e75564f923",
            wiki: "http://marvel.com/universe/Captain_Universe?utm_campaign=apiRef&utm_source=2d52357d6dcd674350fed1e75564f923",
            id: 1011027,
            comics: []
        }
    ];

    const getAllCharacters = async (offset = _baseOffset) => {
		const res = await request(
			`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
		);
		return res.data.results.map(_transformCharacter);
	};

	const getCharacter = async (id) => {
		const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
		return _transformCharacter(res.data.results[0]);
	};

	const getAllComics = async (offset = 0) => {
		const res = await request(
			`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`
		);
		return res.data.results.map(_transformComics);
	};

	const getComics = async (id) => {
		const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
		return _transformComics(res.data.results[0]);
	};

	const _transformCharacter = (char) => {
		return {
			id: char.id,
			name: char.name,
			description: char.description
				? `${char.description.slice(0, 210)}...`
				: "There is no description for this character",
			thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			comics: char.comics.items,
		};
	};

	const _transformComics = (comics) => {
		return {
			id: comics.id,
			title: comics.title,
			description: comics.description || "There is no description",
			pageCount: comics.pageCount
				? `${comics.pageCount} p.`
				: "No information about the number of pages",
			thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
			language: comics.textObjects[0]?.language || "en-us",
			// optional chaining operator
			price: comics.prices[0].price
				? `${comics.prices[0].price}$`
				: "not available",
		};
	};

	return {
		loading,
		error,
		clearError,
		getAllCharacters,
		getCharacter,
		getAllComics,
		getComics,
	};
};

export default useMarvelService;