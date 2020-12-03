
//************************************************************************************************************
// I know.  WHY?  Why go through the trouble of getting a js script off the disk, stuffing it with
// parameters, inserting it into the DOM dynamically and executing it, when you could just wrap this 
// code in a function, and call the function anywhere you would need to do this.
//
// The reason is, if I do that, then every single piece of js code that the page will EVER need has to 
// be loaded as a  <script src=...> tag at the very beginning, resulting in a MUCH larger page load, and 
// potentially loading tons of code you may never use.
//
// Part of the idea for this was inspired by "require.js", which I like the idea of but found overly 
// complicated to use. --KLW
//
//************************************************************************************************************
//
// FIRST: Determine or create the the JS template you want to use.
//
// Example: LoadFlights.js is simply an ajax() call that specifies this for it's data object:
//
//	data: {
//		DateStart: "{{DATESTART}}",
//		DateEnd: "{{DATEEND}}",
//		Specific: JSON.stringify({ "DAY": "{{DAY}}", 
//									"DEP": "{{DEP}}", 
//									"CARRIER": "{{CARRIER}}", 
//									"FLT": "{{FLT}}", 
//									"LEGCD": "{{LEGCD}}" 
//								})
//	}
//
// Notice the {{}} tags.
//
// SECOND: Contsruct a javascript object that contains name/value pairs that match the tagnames you want 
// to replace, and the values you want to replace them with:
//
// Example: 
//
// var parameters = {	DATESTART:	"12/27/2017",
//						DATEEND:	"12/28/2017"
//					};
//
// This example specifies only values for the {{DATESTART}} and {{DATEEND}} tags.  They will be replaced 
// with the dates supplied.  The remaining macro tags that are unused will be removed from the template
// before it is injected into the page DOM.
//
// Pass these two objects to runScript(source, parameters), which will do the following:
// 
// Replace any passed tag/values in the "parameters" (js object) with the values you specified for them.
// The script will automatically remove any {{macro tags}} for which replacement data was not supplied.
//
// Example:
//
// parameters =
//	{
// 		DateStart: "12/21/2017",
// 		DateEnd: "12/22/2017",
// 		Specific: JSON.stringify({ "DAY": "13557", 
//									"DEP": "IAD", 
//									"CARRIER": "270", 
//									"FLT": "703", 
//									"LEGCD": "" 
//								})
//	}
//
// Inserts (.appendChild()) the script into the DOM, which will cause it to execute.
//
// After running the script, it will remove it from the DOM, so they don't accumulate over time.
//
// *******************************************************************************************************

function runScript(source, parameters) {

	if (URLExists(source)) {

		//
		// NOTE: These are DEFERRED methods, so yes, these callbacks are OUTSIDE the closing brace.  
		// They *append* to the get() call insted of being inside the get call like a traditional
		// jQuery .ajax() or .get() call.  Those methods include the callbacks *inside* the ajax/get 
		// call closing brace, .ajax(url:asdf, dataType:sfdg, SUCCESS: callback(); ERROR: adsf()).  etc
		//
		// Whereas these *deferreds* append to it: get().done(function(){}), get().fail(function(){}) etc
		//
		// Must be "text", not "script".  "Script" causes it to execute the script immediately as soon 
		// as it is retrieved.  I want it to execute only when I actually insert it in the page.
		//

		var getScript = $.get({
			url: source,
			dataType: "text"
		})

			.done(function (code) {

				// stuff/replace tags
				for (var p in parameters) {									
					code = code.replace("{{" + p + "}}", parameters[p]);
				}

				// remove unused tags
				while (code.indexOf("{{") >= 0) {							
					code = code.substr(0, code.indexOf("{{")) + code.substr(code.indexOf("}}") + 2);
				}

				var s = document.createElement('script');
				s.type = "text/javascript";
				s.text = code;

				document.body.appendChild(s);	// insert and execute the script
				document.body.removeChild(s);	// after it runs, remove it from the DOM

			})

			.fail(function () {
				alert("Failed to retrieve script: " + source);
			})

	}
	else {

		alert("Script Resource Not Found: " + source);

	}

}
