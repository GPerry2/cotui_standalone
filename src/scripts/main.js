// The main javascript file for cotui_standalone.
// IMPORTANT:
// Any resources from this project should be referenced using SRC_PATH preprocessor var
// Ex: let myImage = '/*@echo SRC_PATH*//img/sample.jpg';

$(function () {
  if (window['cot_app']) { //the code in this 'if' block should be deleted for embedded apps
    const app = new cot_app("cotui_standalone", {
      hasContentTop: false,
      hasContentBottom: false,
      hasContentRight: false,
      hasContentLeft: false,
      searchcontext: 'INTRA'
    });

    app.setBreadcrumb([
      {"name": "cotui_standalone", "link": "#"}
    ]).render();
  }
  let container = $('#cotui_standalone_container');


  let f = new CotForm({
    "id": 'test_form',
    "title": "TEST COTUI IN A CotForm",
    "rootPath": "",
    "useBinding": false,
    "sections": [
      {
        "id": "test_section_one",
        "title": "",
        "rows": [
          {
            "fields": [
              {
                "id": "firstName",
                "title": "First Name",
                "type": "text",
                "required": true
              }
            ]
          },
          {
            "fields": [
              {
                "id": "test_area",
                "type": "html",
                "html": `<div id="typeahead_test_area"></div>`
              }
            ]
          },
          {
            "fields":[
              {
                "id": "saveReport",
                "title": "Save",
                "type": "html",
                "html": "<button  class=\"btn btn-success btn-save\" id=\"save\"><span class=\"glyphicon glyphicon-floppy-disk\" aria-hidden=\"true\"></span> " + "Save" + "</button>",
                "class": "pull-left"
              }
            ]
          }
        ]
      }
    ],
    success: function () {

    }
  });

  f.render({"target": container});


  var ui = new COTUI();
  var autosuggestVUE = ui.Autosuggest({target: '#test_areaElement', initCustomElements: true});
  var autosuggest = ui.Autosuggest({
    target: '#typeahead_test_area',
    label: 'Find Address or Intersection',
    button: 'Lookup',
    icon: 'glyphicon glyphicon-map-marker',
    type: 'api',
    limit: 10,
    dataApi: {
      value: 'KEYSTRING',
      text: 'ADDRESS',
      path: 'result.rows',
      url: 'https://map.toronto.ca/cotgeocoder/rest/geocoder/suggest?f=json&addressOnly=0&retRowLimit=100&searchString={QUERY}',
      includeAll: true
    }
  });

  autosuggest.results(function (evt) {
    console.log('Got Results', evt)
  });
  autosuggest.selected(function (evt) {
    console.log('Selected Fired', evt)
  });
  autosuggest.submit(function (evt) {
    console.log('Submit Fired', evt)
  });
});
