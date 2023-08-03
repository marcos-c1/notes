describe('test auth route', () => {
	test('testing auth/', async () => {
		const payload = '{"username": "teste", "password": "123"}';
		const res = await fetch('http://localhost:5000/auth', {
			method: 'POST', 
			body: payload
		});
		expect(res.status).toBe(200);	
	})
})
