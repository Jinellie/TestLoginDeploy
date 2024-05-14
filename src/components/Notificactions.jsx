const Notification = ({ mensaje }) => {
	if (mensaje === null) {
		return null;
	}

	return (
		<div>
			<p className="text-xs text-gray-500 mt-3">{mensaje}</p>
		</div>
	);
};

export default Notification;
