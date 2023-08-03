describe('test refresh token route', () => {
	test('testing /refresh', async () => {
		// only needs cookie in session
		const res = await fetch('http://localhost:5000/refresh', {
			method: 'GET', 
		});
		expect(res.status).toBe(200);	
	})
})
