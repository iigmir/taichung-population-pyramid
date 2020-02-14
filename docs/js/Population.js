class Population {
    constructor({ source = [], district = "", villege = "", gender = "計" })
    {
        this.source = source;
        // 區別
        this.district = district;
        // 里別
        this.villege = villege;
        // 性別
        this.gender = gender;
        this.labels = {
            district: "區別",
            villege: "里別",
            gender: "性別",
            sum: "總計",
        };
    }
    set_district( district )
    {   // 區別
        this.district = district;
        this.villege = "";
    }
    set_villege( villege )
    {   // 里別
        this.villege = villege;
    }
    set_gender( gender )
    {   // 男, 女, 計
        this.gender = gender;
    }
    _current_list()
    {
        return this.source.filter( item =>
            this.district === item[ this.labels.district ] &&
            this.villege === item[ this.labels.villege ]
        );
    }
    _list_module( given_gender = "計" )
    {
        const list = this._current_list().filter( item => given_gender === item[ this.labels.gender ] )[0];
        const list_key = Object.keys( list ).filter( str => str.includes( "歲" ) );
        return list_key.map( age => ({ age, pop: list[ age ] } ));
    }
    male_data()
    {
        return this._list_module( "男" );
    }
    female_data()
    {
        return this._list_module( "女" );
    }
    sum_data()
    {
        return this._list_module( "計" );
    }
    mf_data()
    {
        const list_key = this.male_data().map( generation => generation.age );
        return list_key.map( age => ({
            age,
            male: this.male_data().filter( generation => generation.age === age )[0].pop,
            female: this.female_data().filter( generation => generation.age === age )[0].pop,
        }) );
    }
    district_data()
    {
        return [...new Set(
            this.source.map( item => item[ this.labels.district ] )
        )];
    }
    villege_data()
    {
        return [...new Set(
            this.source.map( item => item[ this.labels.villege ] )
        )];
    }
    district_and_villege_data()
    {
        return this.district_data().map( district =>
        {
            const villeges = [...new Set(
                this.source.filter( villege =>
                    villege[ this.labels.district ] === district && 
                    villege[ this.labels.gender ] === "計"
                )
            )].map( item => item[ this.labels.villege ] );
            return { district, villeges };
        });
    }
};

export default Population;
