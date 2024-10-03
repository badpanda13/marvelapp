

class  MarvelService {

    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=2d52357d6dcd674350fed1e75564f923';
    _baseOffset = 210;

    //for work without internet
    dataArray = [ 
        {
            name: "Captain Flint",
            description: "",
            thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.undefined",
            homepage: "http://marvel.com/characters/384/captain_flint?utm_campaign=apiRef&utm_source=2d52357d6dcd674350fed1e75564f923",
            wiki: "http://marvel.com/comics/characters/1011196/captain_flint?utm_campaign=apiRef&utm_source=2d52357d6dcd674350fed1e75564f923",
            id: 1011196
        },
        {
            name: "Captain Marvel (Carol Danvers)",
            description: "",
            thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/6/80/5269608c1be7a.undefined",
            homepage: "http://marvel.com/characters/9/captain_marvel?utm_campaign=apiRef&utm_source=2d52357d6dcd674350fed1e75564f923",
            wiki: "http://marvel.com/universe/Ms._Marvel_(Carol_Danvers)?utm_campaign=apiRef&utm_source=2d52357d6dcd674350fed1e75564f923",
            id: 1010338
        },
        {
            name: "Captain Marvel (Genis-Vell)",
            description: "",
            thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.undefined",
            homepage: "http://marvel.com/characters/9/captain_marvel?utm_campaign=apiRef&utm_source=2d52357d6dcd674350fed1e75564f923",
            wiki: "http://marvel.com/universe/Photon_(Genis-Vell)?utm_campaign=apiRef&utm_source=2d52357d6dcd674350fed1e75564f923",
            id: 1011096
        },
        {
            name: "Captain Marvel (Mar-Vell)",
            description: "",
            thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/f/60/526032048d1a1.undefined",
            homepage: "http://marvel.com/characters/1009224/captain_marvel_mar-vell/featured?utm_campaign=apiRef&utm_source=2d52357d6dcd674350fed1e75564f923",
            wiki: "http://marvel.com/universe/Captain_Marvel_(Mar-Vell)?utm_campaign=apiRef&utm_source=2d52357d6dcd674350fed1e75564f923",
            id: 1009224
        },
        {
            name: "Captain Marvel (Monica Rambeau)",
            description: "",
            thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/9/00/4c0030bee8c86.undefined",
            homepage: "http://marvel.com/characters/9/captain_marvel?utm_campaign=apiRef&utm_source=2d52357d6dcd674350fed1e75564f923",
            wiki: "http://marvel.com/universe/Rambeau,%20Monica?utm_campaign=apiRef&utm_source=2d52357d6dcd674350fed1e75564f923",
            id: 1011095
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
            id: 1011355
        },
        {
            name: "Captain Stacy",
            description: "NYPD Captain George Stacy was the father of one-time Peter Parker girlfriend Gwen Stacy.",
            thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/2/a0/4c00407752be2.undefined",
            homepage: "http://marvel.com/characters/390/captain_stacy?utm_campaign=apiRef&utm_source=2d52357d6dcd674350fed1e75564f923",
            wiki: "http://marvel.com/universe/Stacy%2C_George?utm_campaign=apiRef&utm_source=2d52357d6dcd674350fed1e75564f923",
            id: 1009225
        },
        {
            name: "Captain Universe",
            description: "",
            thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/4/c0/4c00324c12ba2.undefined",
            homepage: "http://marvel.com/characters/392/captain_universe?utm_campaign=apiRef&utm_source=2d52357d6dcd674350fed1e75564f923",
            wiki: "http://marvel.com/universe/Captain_Universe?utm_campaign=apiRef&utm_source=2d52357d6dcd674350fed1e75564f923",
            id: 1011027
        }
    ];

    getResource = async (url) => {
        let res = await fetch(url);

        if(!res.ok){
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?limit=9&offset=210&${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
        return {name: char.name,
                description: char.description,
                thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
                homepage: char.urls[0].url,
                wiki: char.urls[1].url,
                id: char.id,
                comics: (char.comics.items) ? char.comics.items.slice(10) : []
        }
    }
}
export default MarvelService;