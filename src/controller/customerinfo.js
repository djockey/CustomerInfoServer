import Base from './base.js';

module.exports = class extends Base {
	addAction() {
		let customerInfoDAO = this.mongo("c_userinfo");
		let phone = this.get('phone');
		if (!phone || phone.length != 11) {
			this.fail('E002', '手机号非法！');
			return;
		}
		customerInfoDAO.addUserInfo({
			name: this.get('name') || '',
			nameType: this.get('nameType') || '',
			phone: phone,
			roomSize: this.get('roomSize') || '',
			price: this.get('price') || ''
		});
		this.header('Access-Control-Allow-Origin', this.header('origin') || '*');
		this.header('Access-Control-Allow-Headers', 'Content-Type,x-requested-with');
		this.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,DELETE");
		this.header('Access-Control-Allow-Credentials', 'true');
		this.success({}, '写入数据成功！');
	}

	async listAction() {
		let customerInfoDAO = this.mongo("c_userinfo");
		let data = await customerInfoDAO.listUserInfo({
			startDate: new Date(this.get('startDate')),
			endDate: new Date(this.get('endDate'))
		});
		this.header('Access-Control-Allow-Origin', this.header('origin') || '*');
		this.header('Access-Control-Allow-Headers', 'Content-Type,x-requested-with');
		this.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,DELETE");
		this.header('Access-Control-Allow-Credentials', 'true');
		if (data) {
			this.success(data, '获取数据成功！');
		} else {
			this.fail('E001', '获取数据失败！');
		}
	}
};
