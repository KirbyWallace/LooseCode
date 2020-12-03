function PostNavTo(url) {

	// PostNavTo(url) takes an unsecure url that would ordinarily be in the browser's address bar (where 
	// users can tamper with it), and converts it into a <form> which it then submits via POST on the HTTP 
	// header, instead of in the URL.  The URL parameters are each transformed into a text <input> with the
	// URL Key/Value pairs used to name the input to match the URL key, and the value of the text input is 
	// set from ther URL value.  The form is then POSTed to the URL's target page.  
	// 
	// Basically:
	//
	// URL: FPR_Edit.aspx?company_id=2&request_id=5405&section=CityPairs
	//
	// Becomes, essentially: 
	//
	//	form action="FPR_Edit.aspx" method="POST">
	//		<input type=text	name="company_id"	value="2">
	//		<input type=text	name="request_id"	value="5405">
	//		<input type=text	name="section"		value="CityPairs">
	//	</form>
	//
	//	<script>
	//		form.submit();
	//	</script >
	//
	// Since data are submitted as text inputs on a form, URL decoding is not necessary on the other end.
	// You do not have to worry about converting "City Pairs & Airports" into "City%20Pairs%20%26%20Airports"
	// before sending it.  Text can be transported on the http header in plain text.
	// 
	// Because we are converting a URL into a FORM, PostNavTo() then can only navigate to ASPX pages, which 
	// is why all top level pages are ASPX pages inside of which HTML templates are rendered. 
	//
	// -- KLW


	var page = url.substring(0, url.indexOf("?"));
	var query = url.substring(url.indexOf("?") + 1);

	var x = document.createElement('form');
	x.style.display = "none";
	x.method = "post";
	x.action = page;

	var a = query.split("&");

	for (i = 0; i < a.length; i++) {
		y = document.createElement('input');
		y.name = a[i].split("=")[0];
		y.value = a[i].split("=")[1];

		x.appendChild(y);
	}

	document.body.appendChild(x);

	x.submit();

}
