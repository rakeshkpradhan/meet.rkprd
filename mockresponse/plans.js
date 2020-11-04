export default function() {
    return Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            id: 0,
            planname: 'Monthly',
            plandescription:'Plan is a Monthly plan',
            billingamount:500,
            billingfreqency:'monthly'
          },
          {
            id: 1,
            planname: 'Yearly',
            plandescription:'Plan is a Yearly plan',
            billingamount:1500,
            billingfreqency:'yearly'
          }
        ])
   
    })
  }