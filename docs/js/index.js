import Population from "./Population.js";
import population_source from "./pop-2020-01.js";
import chart_config from "./Config.js";

const generate_select = ({
    district_and_villege_data = [],
    initial_value = "",
    select_dom = {}
}) => {
    district_and_villege_data.forEach( district =>
    {
        const d = document.createElement( "optgroup" );
        district.villeges.forEach( villege =>
        {
            const v = document.createElement( "option" );
            v.innerText = villege;
            v.value = villege;
            d.appendChild( v );
        });
        d.label = district.district;
        select_dom.appendChild( d );
    });
    select_dom.value = initial_value;
};

const render_selected_place = ({ district, villege }) =>
{
    document.getElementById( "current-district" ).innerText = district;
    document.getElementById( "current-villege" ).innerText = villege;
};

am4core.ready(() =>
{
    am4core.useTheme( am4themes_animated );
    const pop = new Population({
        source: population_source,
        district: population_source[0]["區別"],
        villege: population_source[0]["里別"],
        gender: "計"
    });
    let chart = {};
    generate_select({
        district_and_villege_data: pop.district_and_villege_data(),
        initial_value: population_source[0]["里別"],
        select_dom: document.getElementById( "select-district" )
    });
    chart = am4core.createFromConfig({
        width: 600,
        height: 600,
        layout: "horizontal",
        children: chart_config( pop.mf_data() ),
    }, "chartdiv", am4core.Container );
    render_selected_place({
        district: population_source[0]["區別"],
        villege: population_source[0]["里別"]
    });
    document.getElementById( "select-district" ).onchange = event =>
    {
        const new_villege = event.target.value;
        const new_district = event.target.selectedOptions[0].parentElement.label;
        chart.dispose();
        chart = null;
        pop.set_district( new_district );
        pop.set_villege( new_villege );
        chart = am4core.createFromConfig({
            width: 600,
            height: 600,
            layout: "horizontal",
            children: chart_config( pop.mf_data() ),
        }, "chartdiv", am4core.Container );
        render_selected_place({
            district: new_district,
            villege: new_villege
        });
    };
});
