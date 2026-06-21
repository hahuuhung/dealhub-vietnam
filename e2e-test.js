const http = require('http');

const API_URL = 'http://localhost:3001';

async function request(method, path, body = null, token = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(API_URL + path);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, data });
        }
      });
    });

    req.on('error', reject);

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('--- Starting E2E Tests ---');
  let token = '';

  // 1. Auth Login (Consumer)
  console.log('\n[Test 1] Login as Consumer (0901234567)');
  const loginRes = await request('POST', '/auth/login', { phone: '0901234567' });
  if (loginRes.status === 201 || loginRes.status === 200) {
    console.log('✅ Login successful!');
    token = loginRes.data.access_token;
  } else {
    console.error('❌ Login failed:', loginRes.data);
    return;
  }

  // 2. Fetch Deals
  console.log('\n[Test 2] Fetch Featured Deals');
  const dealsRes = await request('GET', '/deals/featured');
  let dealId = '';
  if (dealsRes.status === 200 && Array.isArray(dealsRes.data) && dealsRes.data.length > 0) {
    console.log(`✅ Deals fetched! Found ${dealsRes.data.length} deals.`);
    dealId = dealsRes.data[0].id;
  } else {
    console.error('❌ Fetch deals failed:', dealsRes.data);
    return;
  }

  // 3. Checkout (Create Order & Vouchers)
  console.log('\n[Test 3] Checkout 2 Vouchers for Deal: ' + dealId);
  const checkoutRes = await request('POST', '/orders/checkout', {
    items: [{ dealId: dealId, qty: 2, price: 199000 }]
  }, token);

  if (checkoutRes.status === 201 || checkoutRes.status === 200) {
    console.log('✅ Checkout successful! Order ID:', checkoutRes.data.id);
  } else {
    console.error('❌ Checkout failed:', checkoutRes.data);
    return;
  }

  // 4. Fetch My Vouchers
  console.log('\n[Test 4] Fetch My Vouchers');
  const vouchersRes = await request('GET', '/vouchers/my', null, token);
  if (vouchersRes.status === 200 && Array.isArray(vouchersRes.data)) {
    console.log(`✅ Vouchers fetched! You have ${vouchersRes.data.length} vouchers.`);
  } else {
    console.error('❌ Fetch vouchers failed:', vouchersRes.data);
    return;
  }

  console.log('\n🎉 All E2E Tests Passed Successfully!');
}

runTests().catch(console.error);
