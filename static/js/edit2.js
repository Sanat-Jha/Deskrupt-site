
document.addEventListener("DOMContentLoaded", function () {

  loadwidgets();
document.getElementsByClassName("add-widget-btn")[0].addEventListener("click", function () {
  var widgetType = document.getElementsByClassName("widgets-choose-dropdown")[0].value;
  if ( widgitsjson["widgets"]  == undefined){
    widgitsjson["widgets"] = [];
  }
  if (widgetType=="Text") {
    widgitsjson["widgets"].push({
      "type": "Text",
      "text": "",
      "alignment": "Left",
      "font": "Arial",
      "font-size": 12,
      "margin x": 0,
      "margin y": 0,
      "padding x": 0,
      "padding y": 0,
      "bg color": "#ffffff",
      "text colour": "#000000"
    });
  }
  else if (widgetType=="Day") {
    widgitsjson["widgets"].push({
      "type": "Day",
      "alignment": "Left",
      "font": "Arial",
      "font-size": 12,
      "margin x": 0,
      "margin y": 0,
      "padding x": 0, 
      "padding y": 0,
      "Border Radius": 0,
      "bg color": "#ffffff",
      "text colour": "#000000"
  });
  }
  else if (widgetType=="Date") {
    widgitsjson["widgets"].push({
      "type": "Date",
      "alignment": "Left",
      "format": "dd/MM/yyyy",
      "font": "Arial",
      "font-size": 12,
      "margin x": 0,
      "margin y": 0,
      "padding x": 0, 
      "padding y": 0,
      "Border Radius": 0,
      "bg color": "#ffffff",
      "text colour": "#000000"
  });
  }
  else if (widgetType=="Analog Clock") {
    widgitsjson["widgets"].push({
      "type": "Analog Clock",
      "alignment": "Left",
      "margin x": 0,
      "margin y": 0,
      "padding x": 0, 
      "padding y": 0,
      "Border Radius": 0,
      "radius": 10,
      "bg color": "#ffffff",
  });
  }
  loadwidgets();
});
});

function loadwidgets() {
  
  var widgetslist = widgitsjson["widgets"];
  var widgetbox = document.getElementsByClassName("widgetslist")[0];
  widgetbox.innerHTML = "";
  console.log(widgetslist);
  if (widgetslist == undefined){
    widgitsjson["widgets"] = [];
    return ; 
  }
  widgetslist.forEach(function (widget) {
    var widgetdiv = document.createElement("div");
    widgetdiv.classList.add("widget");
    if (widget.type == "Text") {
      widgetdiv.innerHTML = `
<div class="widgettitle">${widget["type"]}</div>
  <div class="widgetboxfields">
  <label for="widgettext">Text</label>
  <input type="text" class="widgettext" placeholder="Enter Text" value="${widget["text"]}">
  <!-- inputs for alignment, font, font-size, margin x, margin y, padding x, padding y, background colour, text colour -->
  <label for="widgetalignment">Alignment</label>
  <select class="widgetalignment">
    <option value="Left" ${widget["alignment"] == "Left" ? "selected" : ""}>Left</option>
    <option value="Center" ${widget["alignment"] == "Center" ? "selected" : ""}>Center</option>
    <option value="Right" ${widget["alignment"] == "Right" ? "selected" : ""}>Right</option>
  </select>
  <label for="widgetfont">Font</label>
  <!-- font will be a text area -->
  <input type="text" class="widgetfont" placeholder="Enter Font" value="${widget["font"]}">
  <a href="/fonts-gallery/" style="text-decoration: none; color: #007BFF;margin-bottom: 10px;" target="_blank">Choose Font</a>
  <label for="widgetfontsize">Font Size</label>
  <input type="number" class="widgetfontsize" placeholder="Enter Font Size" value="${widget["font-size"]}">
  <label for="widgetmarginx">Margin X</label>
  <input type="number" class="widgetmarginx" placeholder="Enter Margin X" value="${widget["margin x"]}">
  <label for="widgetmarginy">Margin Y</label>
  <input type="number" class="widgetmarginy" placeholder="Enter Margin Y" value="${widget["margin y"]}">
  <label for="widgetpaddingx">Padding X</label>
  <input type="number" class="widgetpaddingx" placeholder="Enter Padding X" value="${widget["padding x"]}">
  <label for="widgetpaddingy">Padding Y</label>
  <input type="number" class="widgetpaddingy" placeholder="Enter Padding Y" value="${widget["padding y"]}">
  <label for="widgetbackgroundcolour">Background Colour</label>
  <input type="color" class="widgetbackgroundcolour" placeholder="Enter Background Colour" value="${widget["bg color"]}">
  <label for="widgettextcolour">Text Colour</label>
  <input type="color" class="widgettextcolour" placeholder="Enter Text Colour" value="${widget["text colour"]}">
  <button class="delete-widget-btn">Delete</button>
    `;
      widgetbox.appendChild(widgetdiv);
        // Attach event listeners to input elements to update `widgitsjson` when the user makes changes
  widgetdiv.querySelector(".widgettext").addEventListener("input", function (event) {
    widget["text"] = event.target.value; // Update text in the widget's data
  });

  widgetdiv.querySelector(".widgetalignment").addEventListener("change", function (event) {
    widget["alignment"] = event.target.value; // Update alignment in the widget's data
  });

  widgetdiv.querySelector(".widgetfont").addEventListener("input", function (event) {
    widget["font"] = event.target.value; // Update font in the widget's data
  });

  widgetdiv.querySelector(".widgetfontsize").addEventListener("input", function (event) {
    widget["font-size"] = parseFloat(event.target.value); // Update font size in the widget's data
  });

  widgetdiv.querySelector(".widgetmarginx").addEventListener("input", function (event) {
    widget["margin x"] = parseFloat(event.target.value); // Update margin x in the widget's data
  });

  widgetdiv.querySelector(".widgetmarginy").addEventListener("input", function (event) {
    widget["margin y"] = parseFloat(event.target.value); // Update margin y in the widget's data
  });

  widgetdiv.querySelector(".widgetpaddingx").addEventListener("input", function (event) {
    widget["padding x"] = parseFloat(event.target.value); // Update padding x in the widget's data
  });

  widgetdiv.querySelector(".widgetpaddingy").addEventListener("input", function (event) {
    widget["padding y"] = parseFloat(event.target.value); // Update padding y in the widget's data
  });

  widgetdiv.querySelector(".widgetbackgroundcolour").addEventListener("input", function (event) {
    widget["bg color"] = event.target.value; // Update background color in the widget's data
  });

  widgetdiv.querySelector(".widgettextcolour").addEventListener("input", function (event) {
    widget["text colour"] = event.target.value; // Update text color in the widget's data
  });
    }
    else if (widget.type == "Day") {
      widgetdiv.innerHTML = `
  
  <div class="widgettitle">${widget["type"]}</div>
  <div class="widgetboxfields">
  <label for="widgetfont">Font</label>
  <!-- font will be a text area -->
  <input type="text" class="widgetfont
  " placeholder="Enter Font" value="${widget["font"]}">
    <a href="/fonts-gallery/" style="text-decoration: none; color: #007BFF;margin-bottom: 10px;" target="_blank">Choose Font</a>
  <label for="widgetfontsize">Font Size</label>
  <input type="number" class="widgetfontsize" placeholder="Enter Font Size" value="${widget["font-size"]}">
  <label for="widgetalignment">Alignment</label>
  <select class="widgetalignment">
    <option value="Left" ${widget["alignment"] == "Left" ? "selected" : ""}>Left</option>
    <option value="Center" ${widget["alignment"] == "Center" ? "selected" : ""}>Center</option>
    <option value="Right" ${widget["alignment"] == "Right" ? "selected" : ""}>Right</option>
  </select>
  <label for="widgetborderradius">Border Radius</label>
  <input type="number" class="widgetborderradius" placeholder="Enter Border Radius" value="${widget["Border Radius"]}">
  <label for="widgetmarginx">Margin X</label>
  <input type="number" class="widgetmarginx" placeholder="Enter Margin X" value="${widget["margin x"]}">
  <label for="widgetmarginy">Margin Y</label>
  <input type="number" class="widgetmarginy" placeholder="Enter Margin Y" value="${widget["margin y"]}">
  <label for="widgetpaddingx">Padding X</label>
  <input type="number" class="widgetpaddingx" placeholder="Enter Padding X" value="${widget["padding x"]}">
  <label for="widgetpaddingy">Padding Y</label>
  <input type="number" class="widgetpaddingy" placeholder="Enter Padding Y" value="${widget["padding y"]}">
  <label for="widgetbackgroundcolour">Background Colour</label>
  <input type="color" class="widgetbackgroundcolour" placeholder="Enter Background Colour" value="${widget["bg color"]}">
  <label for="widgettextcolour">Text Colour</label>
  <input type="color" class="widgettextcolour" placeholder="Enter Text Colour" value="${widget["text colour"]}">
  <button class="delete-widget-btn">Delete</button>
  `;
      widgetbox.appendChild(widgetdiv);



      widgetdiv.querySelector(".widgetfont").addEventListener("input", function (event) {
        widget["font"] = event.target.value; // Update font in the widget's data
      });

      widgetdiv.querySelector(".widgetfontsize").addEventListener("input", function (event) {
        widget["font-size"] = parseFloat(event.target.value); // Update font size in the widget's data
      });

      widgetdiv.querySelector(".widgetalignment").addEventListener("change", function (event) {
        widget["alignment"] = event.target.value; // Update alignment in the widget's data
      });

      widgetdiv.querySelector(".widgetborderradius").addEventListener("input", function (event) {
        widget["Border Radius"] = parseFloat(event.target.value); // Update border radius in the widget's data
      });

      widgetdiv.querySelector(".widgetmarginx").addEventListener("input", function (event) {
        widget["margin x"] = parseFloat(event.target.value); // Update margin x in the widget's data
      });

      widgetdiv.querySelector(".widgetmarginy").addEventListener("input", function (event) {
        widget["margin y"] = parseFloat(event.target.value); // Update margin y in the widget's data
      });

      widgetdiv.querySelector(".widgetpaddingx").addEventListener("input", function (event) {
        widget["padding x"] = parseFloat(event.target.value); // Update padding x in the widget's data
      });

      widgetdiv.querySelector(".widgetpaddingy").addEventListener("input", function (event) {
        widget["padding y"] = parseFloat(event.target.value); // Update padding y in the widget's data
      });

      widgetdiv.querySelector(".widgetbackgroundcolour").addEventListener("input", function (event) {
        widget["bg color"] = event.target.value; // Update background color in the widget's data
      });

      widgetdiv.querySelector(".widgettextcolour").addEventListener("input", function (event) {
        widget["text colour"] = event.target.value; // Update text color in the widget's data
      });
      
    }
    else if (widget.type == "Date") {
      widgetdiv.innerHTML = `
      <div class="widgettitle">${widget["type"]}</div>
      <div class="widgetboxfields">
        <label for="widgetfont">Font</label>
        <!-- font will be a text area -->
        <input type="text" class="widgetfont
        " placeholder="Enter Font" value="${widget["font"]}">
          <a href="/fonts-gallery/" style="text-decoration: none; color: #007BFF;margin-bottom: 10px;" target="_blank">Choose Font</a>
        <label for="widgetfontsize">Font Size</label>
        <input type="number" class="widgetfontsize" placeholder="Enter Font Size" value="${widget["font-size"]}">
        <label for="widgetalignment">Alignment</label>
        <select class="widgetalignment">
          <option value="Left" ${widget["alignment"] == "Left" ? "selected" : ""}>Left</option>
          <option value="Center" ${widget["alignment"] == "Center" ? "selected" : ""}>Center</option>
          <option value="Right" ${widget["alignment"] == "Right" ? "selected" : ""}>Right</option>
  </select>
  <label for="widgetformat">Format</label>
  <select class="widgetalignment widgetformat">
          <option value="dd/MM/yyyy" ${widget["format"] == "dd/MM/yyyy" ? "selected" : ""}>dd/MM/yyyy</option>
          <option value="MM/dd/yyyy" ${widget["format"] == "MM/dd/yyyy" ? "selected" : ""}>MM/dd/yyyy</option>
          <option value="yyyy/MM/dd" ${widget["format"] == "yyyy/MM/dd" ? "selected" : ""}>yyyy/MM/dd</option>
          <option value="dd/MM/yy" ${widget["format"] == "dd/MM/yy" ? "selected" : ""}>dd/MM/yy</option>
          <option value="MM/dd/yy" ${widget["format"] == "MM/dd/yy" ? "selected" : ""}>MM/dd/yy</option>
          <option value="yy/MM/dd" ${widget["format"] == "yy/MM/dd" ? "selected" : ""}>yy/MM/dd</option>
          <option value="dd-MM-yyyy" ${widget["format"] == "dd-MM-yyyy" ? "selected" : ""}>dd-MM-yyyy</option>
          <option value="MM-dd-yyyy" ${widget["format"] == "MM-dd-yyyy" ? "selected" : ""}>MM-dd-yyyy</option>
          <option value="dd MMM yyyy" ${widget["format"] == "dd MMM yyyy" ? "selected" : ""}>dd MMM yyyy</option>
          <option value="MMM dd yyyy" ${widget["format"] == "MMM dd yyyy" ? "selected" : ""}>MMM dd yyyy</option>
  </select>
  <label for="widgetborderradius">Border Radius</label>
  <input type="number" class="widgetborderradius" placeholder="Enter Border Radius" value="${widget["Border Radius"]}">
  <label for="widgetmarginx">Margin X</label>
  <input type="number" class="widgetmarginx" placeholder="Enter Margin X" value="${widget["margin x"]}">
  <label for="widgetmarginy">Margin Y</label>
  <input type="number" class="widgetmarginy" placeholder="Enter Margin Y" value="${widget["margin y"]}">
  <label for="widgetpaddingx">Padding X</label>
  <input type="number" class="widgetpaddingx" placeholder="Enter Padding X" value="${widget["padding x"]}">
  <label for="widgetpaddingy">Padding Y</label>
  <input type="number" class="widgetpaddingy" placeholder="Enter Padding Y" value="${widget["padding y"]}">
  <label for="widgetbackgroundcolour">Background Colour</label>
  <input type="color" class="widgetbackgroundcolour" placeholder="Enter Background Colour" value="${widget["bg color"]}">
  <label for="widgettextcolour">Text Colour</label>
  <input type="color" class="widgettextcolour" placeholder="Enter Text Colour" value="${widget["text colour"]}">
  <button class="delete-widget-btn">Delete</button>
      `;
    widgetbox.appendChild(widgetdiv);

    widgetdiv.querySelector(".widgetfont").addEventListener("input", function (event) {
      widget["font"] = event.target.value; // Update font in the widget's data
    });

    widgetdiv.querySelector(".widgetfontsize").addEventListener("input", function (event) {
      widget["font-size"] = parseFloat(event.target.value); // Update font size in the widget's data
    });

    widgetdiv.querySelector(".widgetalignment").addEventListener("change", function (event) {
      widget["alignment"] = event.target.value; // Update alignment in the widget's data
    });

    widgetdiv.querySelector(".widgetformat").addEventListener("change", function (event) {
      widget["format"] = event.target.value; // Update format in the widget's data
    });

    widgetdiv.querySelector(".widgetborderradius").addEventListener("input", function (event) {
      widget["Border Radius"] = parseFloat(event.target.value); // Update border radius in the widget's data
    });

    widgetdiv.querySelector(".widgetmarginx").addEventListener("input", function (event) {
      widget["margin x"] = parseFloat(event.target.value); // Update margin x in the widget's data
    });

    widgetdiv.querySelector(".widgetmarginy").addEventListener("input", function (event) {
      widget["margin y"] = parseFloat(event.target.value); // Update margin y in the widget's data
    });

    widgetdiv.querySelector(".widgetpaddingx").addEventListener("input", function (event) {
      widget["padding x"] = parseFloat(event.target.value); // Update padding x in the widget's data
    });

    widgetdiv.querySelector(".widgetpaddingy").addEventListener("input", function (event) {
      widget["padding y"] = parseFloat(event.target.value); // Update padding y in the widget's data
    });

    widgetdiv.querySelector(".widgetbackgroundcolour").addEventListener("input", function (event) {
      widget["bg color"] = event.target.value; // Update background color in the widget's data
    });

    widgetdiv.querySelector(".widgettextcolour").addEventListener("input", function (event) {
      widget["text colour"] = event.target.value; // Update text color in the widget's data 
    });

    }
    else if (widget.type == "Analog Clock") {
      // {
      //   "type": "Analog Clock",
      //   "padding x": 10,
      //   "padding y": 10,
      //   "margin x": 10,
      //   "margin y": 10,
      //   "Border Radius": 5,
      //   "radius": 100,
      //   "alignment": "Center",
      //   "bg color": "#000000",
      // }
      widgetdiv.innerHTML = ` 
      <div class="widgettitle">${widget["type"]}</div>
      <label for="widgetradius">Radius</label>
      <input type="number" class="widgetradius" placeholder="Enter Radius" value="${widget["radius"]}">
      <label for="widgetalignment">Alignment</label>
      <select class="widgetalignment">
        <option value="Left" ${widget["alignment"] == "Left" ? "selected" : ""}>Left</option>
        <option value="Center" ${widget["alignment"] == "Center" ? "selected" : ""}>Center</option>
        <option value="Right" ${widget["alignment"] == "Right" ? "selected" : ""}>Right</option>
      </select>
      <label for="widgetborderradius">Border Radius</label>
      <input type="number" class="widgetborderradius" placeholder="Enter Border Radius" value="${widget["Border Radius"]}">

      <label for="widgetmarginx">Margin X</label>
      <input type="number" class="widgetmarginx" placeholder="Enter Margin X" value="${widget["margin x"]}">
      <label for="widgetmarginy">Margin Y</label>
      <input type="number" class="widgetmarginy" placeholder="Enter Margin Y" value="${widget["margin y"]}">
      <label for="widgetpaddingx">Padding X</label>
      <input type="number" class="widgetpaddingx" placeholder="Enter Padding X" value="${widget["padding x"]}">
      <label for="widgetpaddingy">Padding Y</label>
      <input type="number" class="widgetpaddingy" placeholder="Enter Padding Y" value="${widget["padding y"]}">
      <label for="widgetbackgroundcolour">Background Colour</label>
      <input type="color" class="widgetbackgroundcolour" placeholder="Enter Background Colour" value="${widget["bg color"]}">
      <button class="delete-widget-btn">Delete</button>
      
      `;
      widgetbox.appendChild(widgetdiv);

      widgetdiv.querySelector(".widgetradius").addEventListener("input", function (event) {
        widget["radius"] = parseFloat(event.target.value); // Update radius in the widget's data
      });

      widgetdiv.querySelector(".widgetalignment").addEventListener("change", function (event) {
        widget["alignment"] = event.target.value; // Update alignment in the widget's data
      });

      widgetdiv.querySelector(".widgetborderradius").addEventListener("input", function (event) {
        widget["Border Radius"] = parseFloat(event.target.value); // Update border radius in the widget's data
      });

      widgetdiv.querySelector(".widgetmarginx").addEventListener("input", function (event) {
        widget["margin x"] = parseFloat(event.target.value); // Update margin x in the widget's data
      });

      widgetdiv.querySelector(".widgetmarginy").addEventListener("input", function (event) {
        widget["margin y"] = parseFloat(event.target.value); // Update margin y in the widget's data
      });

      widgetdiv.querySelector(".widgetpaddingx").addEventListener("input", function (event) {
        widget["padding x"] = parseFloat(event.target.value); // Update padding x in the widget's data
      });

      widgetdiv.querySelector(".widgetpaddingy").addEventListener("input", function (event) {
        widget["padding y"] =parseFloat(event.target.value); // Update padding y in the widget's data
      });

      widgetdiv.querySelector(".widgetbackgroundcolour").addEventListener("input", function (event) {
        widget["bg color"] = event.target.value; // Update background color in the widget's data
      });

    }



    widgetdiv.getElementsByClassName("delete-widget-btn")[0].addEventListener("click", function () {
  // Get the index of the widget in the widgetslist array
  const index = widgetslist.indexOf(widget); // `widget` is the current widget in the loop
  
  // Remove the widget from the widgetslist (JSON data)
  if (index > -1) {
    widgetslist.splice(index, 1); // This removes the widget from the array
  }

  // Now remove the widget from the DOM
  widgetbox.removeChild(widgetdiv);
  
  // Optionally, update the `widgitsjson` object to reflect the changes:
  widgitsjson.widgets = widgetslist; // This updates the JSON with the new, updated widgets list
  console.log(widgitsjson);
});


  });




  var widgetboxes = document.getElementsByClassName("widget");

  // Convert HTMLCollection to an array
  Array.from(widgetboxes).forEach(function (widgetbox) {
    var widgetboxtitle = widgetbox.getElementsByClassName("widgettitle")[0];

    widgetboxtitle.addEventListener("click", function () {
      var widgetboxfields = widgetbox.getElementsByClassName("widgetboxfields")[0];
      widgetboxfields.style.display = widgetboxfields.style.display === "none" ? "block" : "none";
    });
  });
}
