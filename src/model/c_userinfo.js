module.exports = class extends think.Mongo {
	addUserInfo(userInfo) {
		let date = new Date();
		date.setDate(date.getDate() + 1);
		this.add({
			name: userInfo.name,
			nameType: userInfo.nameType,
			phone: userInfo.phone,
			roomSize: userInfo.roomSize,
			price: userInfo.price,
			time: date
		});
	}

	async listUserInfo(dateInfo) {
		return await this.where({
			$and: [
				{"time": {$gte: dateInfo.startDate}},
				{"time": {$lte: dateInfo.endDate}}
			]
		}).select();
	}
};