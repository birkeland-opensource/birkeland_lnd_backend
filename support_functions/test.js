var unconfirmed_tx = [
    {
      _id: "63c511f385ed205dc32f615c",
      chain_address: 'bc1qwuym78yy53un6ulfzcutc4nh0zrn7g9vhjl4vx',
      public_key: '0326743a88af5b0fb7878afc7bdf572de969a5e10a73cd5965d0ef13346de79325',
      wallet_id: '2323f4ce-a073-48aa-97e2-64b3255c037a',
      date_created: '2023-01-16T08:59:31.151Z',
      last_udapted: '2023-01-16T08:59:31.151Z',
      tokens: 0,
      transaction_confirmed: false,
      confirmation_count: 0,
      user_id: 'b5ff4527-872f-4692-8a9a-759758048413',
      __v: 0
    },
    {
      _id: "63c512b92a81723370147cbc",
      chain_address: 'bc1qvg2zh9lul068lft9g9tpzzktnp2qemjscqxt0j',
      public_key: '0326743a88af5b0fb7878afc7bdf572de969a5e10a73cd5965d0ef13346de79325',
      wallet_id: '2323f4ce-a073-48aa-97e2-64b3255c037a',
      date_created: '2023-01-16T09:02:49.670Z',
      last_udapted: '2023-01-16T09:02:49.670Z',
      tokens: 0,
      transaction_confirmed: false,
      confirmation_count: 0,
      user_id: 'b5ff4527-872f-4692-8a9a-759758048413',
      __v: 0
    },
    {
      _id: "63c627f8e9f7b807aa067ab4",
      chain_address: 'bc1qx35va05we6fskk7qq5w5e39l68524kyxw5d2lj',
      public_key: '0326743a88af5b0fb7878afc7bdf572de969a5e10a73cd5965d0ef13346de79325',
      wallet_id: '2323f4ce-a073-48aa-97e2-64b3255c037a',
      date_created: '2023-01-17T04:45:44.488Z',
      last_udapted: '2023-01-17T04:45:44.488Z',
      tokens: 0,
      transaction_confirmed: false,
      confirmation_count: 0,
      user_id: 'b5ff4527-872f-4692-8a9a-759758048413',
      __v: 0
    },
    {
      _id: "63c62885e9f7b807aa067abe",
      chain_address: 'bc1qg3yk65vmftwhvavnvx9fdyyspuus4q0npp0fen',
      public_key: '0326743a88af5b0fb7878afc7bdf572de969a5e10a73cd5965d0ef13346de79325',
      wallet_id: '2323f4ce-a073-48aa-97e2-64b3255c037a',
      date_created: '2023-01-17T04:48:05.508Z',
      last_udapted: '2023-01-17T04:48:05.508Z',
      tokens: 0,
      transaction_confirmed: false,
      confirmation_count: 0,
      user_id: 'b5ff4527-872f-4692-8a9a-759758048413',
      __v: 0
    },
    {
      _id: "63c628b2e9f7b807aa067ac4",
      chain_address: 'bc1q8sh6unnn9qstnzq6szzt9fzj5h678c285eujgn',
      public_key: '0326743a88af5b0fb7878afc7bdf572de969a5e10a73cd5965d0ef13346de79325',
      wallet_id: '2323f4ce-a073-48aa-97e2-64b3255c037a',
      date_created: '2023-01-17T04:48:50.986Z',
      last_udapted: '2023-01-17T04:48:50.986Z',
      tokens: 0,
      transaction_confirmed: false,
      confirmation_count: 0,
      user_id: 'b5ff4527-872f-4692-8a9a-759758048413',
      __v: 0
    }
  ]

 var lightning_utxos =  [
    {
      address: 'bc1q8sh6unnn9qstnzq6szzt9fzj5h678c285eujgn',
      address_format: 'p2wpkh',
      confirmation_count: 42,
      output_script: '00143c2fae4e732820b9881a8084b2a452a5f5e3e147',
      tokens: 33670,
      transaction_id: 'ea4b447f7ecb8026e9a1827354257a80467fdf82eeba91e23947b1b5ca6a430d',
      transaction_vout: 0
    },
    {
      address: 'bc1quyv040u5dusd6u7jmr6aluw8dxc008krh20rae',
      address_format: 'p2wpkh',
      confirmation_count: 173,
      output_script: '0014e118fabf946f20dd73d2d8f5dff1c769b0f79ec3',
      tokens: 50000,
      transaction_id: '6bf99da598afe75ffedbe79ec937d6300452610984e13b3306773a54cbf41103',
      transaction_vout: 0
    },
    {
      address: 'bc1qk3kxrnndugka97saum4548vmm9kdqv9c64k2c7',
      address_format: 'p2wpkh',
      confirmation_count: 1289,
      output_script: '0014b46c61ce6de22dd2fa1de6eb4a9d9bd96cd030b8',
      tokens: 25671,
      transaction_id: 'afc4ecbfd4882670ae88dbbca56c9b815e724449d288400f971a49e0facdd6b5',
      transaction_vout: 0
    }
  ]

  const middleIndex = Math.ceil(lightning_utxos.length / 2);
  console.log(middleIndex)



const firstHalf = lightning_utxos.splice(0, middleIndex);   
const secondHalf = lightning_utxos.splice(-middleIndex);

for (var i=0; i<firstHalf.length;i++){
    console.log(firstHalf[i]);
}

console.log(secondHalf)