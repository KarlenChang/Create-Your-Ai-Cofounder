const GRAPHQL_ENDPOINT = 'http://127.0.0.1:9157/graphql';
const DEVICE_ID = 'agent-device-001';
const EMAIL = 'karlenchang@gmail.com';
const PASSWORD = 'tR1E86e73pUx';
const FORM_ID = 'vV9la7IF';

let cookies = '';

async function gql(query, variables = {}) {
  const headers = { 'Content-Type': 'application/json', 'x-device-id': DEVICE_ID };
  if (cookies) headers['Cookie'] = cookies;
  const resp = await fetch(GRAPHQL_ENDPOINT, { method: 'POST', headers, body: JSON.stringify({ query, variables }) });
  const sc = resp.headers.getSetCookie?.() || [];
  if (sc.length > 0) {
    const nc = sc.map(c => c.split(';')[0]).join('; ');
    cookies = cookies ? cookies + '; ' + nc : nc;
  }
  return resp.json();
}

async function login() {
  console.log('\n[1/5] Logging in...');
  const r = await gql('query($input: LoginInput!) { login(input: $input) }', { input: { email: EMAIL, password: PASSWORD } });
  if (r.errors) throw new Error('Login: ' + JSON.stringify(r.errors));
  console.log('  ✅ Logged in');
}

async function getForm(formId) {
  const r = await gql('query($input: FormDetailInput!) { formDetail(input: $input) { id name description version drafts { id title kind } canPublish } }', { input: { formId } });
  return r.data?.formDetail;
}

async function updateSchemas(formId, drafts, version) {
  console.log('\n[2/5] Updating form schemas...');
  const r = await gql('mutation($input: UpdateFormSchemasInput!) { updateFormSchemas(input: $input) { version canPublish } }', { input: { formId, drafts, version } });
  if (r.errors) throw new Error('updateFormSchemas: ' + JSON.stringify(r.errors));
  console.log('  ✅ Schemas updated, version:', r.data.updateFormSchemas.version);
  return r.data.updateFormSchemas;
}

async function updateFormSettings(formId, name) {
  console.log('\n[3/5] Updating form name...');
  const r = await gql('mutation($input: UpdateFormInput!) { updateForm(input: $input) }', { input: { formId, name } });
  if (r.errors) throw new Error('updateForm: ' + JSON.stringify(r.errors));
  console.log('  ✅ Name updated to:', name);
}

async function publish(formId, drafts, version) {
  console.log('\n[4/5] Publishing form...');
  const r = await gql('mutation($input: UpdateFormSchemasInput!) { publishForm(input: $input) }', { input: { formId, drafts, version } });
  if (r.errors) throw new Error('publishForm: ' + JSON.stringify(r.errors));
  console.log('  ✅ Form published');
}

let fc = 0;
function fid(p) { return p + '-' + Date.now() + '-' + (fc++); }

function makeDrafts() {
  return [
    { id: fid('name'), kind: 'short_text', title: ['Name'], validations: { required: true } },
    { id: fid('nps'), kind: 'number', title: ['How likely are you to recommend this workshop to a friend or colleague?'], validations: { required: false, min: 0, max: 10 } },
    { id: fid('learned'), kind: 'long_text', title: ["What's the one thing you learned today that you'll actually use?"], validations: { required: false } },
    { id: fid('describe'), kind: 'long_text', title: ["When you describe this workshop to someone else, what's the one thing you'll say?"], validations: { required: false } },
    { id: fid('comeback'), kind: 'multiple_choice', title: ['Will you come back for Session 2?'], properties: { choices: [{ id: 'c-yes', label: 'Yes' }, { id: 'c-maybe', label: 'Maybe' }, { id: 'c-no', label: 'No' }] }, validations: { required: false } },
    { id: fid('change'), kind: 'long_text', title: ['What should we change for next time?'], validations: { required: false } },
    { id: 'Hr9aO43h7S1Q', kind: 'thank_you', title: ['Thank you!'], description: ['Thanks for completing this form. Now create your own form.'] }
  ];
}

async function run() {
  try {
    console.log('🚀 HeyForm Post-Session Survey Deployment');
    console.log('==========================================');

    await login();

    const form = await getForm(FORM_ID);
    console.log('\n  Current: v' + form.version + ', ' + form.drafts.length + ' fields, canPublish=' + form.canPublish);

    const drafts = makeDrafts();
    const { version } = await updateSchemas(FORM_ID, drafts, form.version);

    await updateFormSettings(FORM_ID, 'Post-Session Workshop Survey');

    await publish(FORM_ID, drafts, version);

    console.log('\n[5/5] Verifying...');
    const final = await getForm(FORM_ID);

    console.log('\n==========================================');
    console.log('🎉 DEPLOYMENT COMPLETE');
    console.log('==========================================');
    console.log('Form ID:     ' + FORM_ID);
    console.log('Form Name:   ' + final.name);
    console.log('Description: ' + (final.description || '(none settable via API)'));
    console.log('Version:     ' + final.version);
    console.log('Drafts:      ' + final.drafts.length);
    console.log('Can Publish: ' + final.canPublish);
    console.log('');
    final.drafts.forEach((d, i) => {
      const t = Array.isArray(d.title) ? d.title.join('') : d.title;
      console.log('  ' + (i+1) + '. [' + d.kind + '] ' + (t || '(no title)'));
    });
    console.log('==========================================');
    return true;
  } catch (e) {
    console.error('\n❌ FAILED:', e.message);
    return false;
  }
}

run().then(ok => process.exit(ok ? 0 : 1));
