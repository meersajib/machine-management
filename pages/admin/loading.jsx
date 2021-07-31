export default function loading(){
	document.body.classList.add("body-page-transition");

	return (
		<PageChange path={url} />
	)
}