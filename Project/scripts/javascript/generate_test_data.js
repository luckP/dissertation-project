// create links

a = a.map(d => {
    d.data = d.data.map(dd => {

        dd.link = dd.link.map((l, i) => ({link: d.data[l], duration: dd.duration[i], num_service:  dd.num_service[i]}))
        return dd
    })    

return d
})

// create index

a = a.map(d => {
    d.data = d.data.map((dd, i) => {
        dd['index'] = i
        return dd
    })    

return d
})

// sort by n_services_percent
a = a.map(d => {
    d.data = d.data.sort((b, c) => b.n_services_percent > c.n_services_percent ? -1 : 1)

return d
})

// aglomerate data

let maxClusters = Math.max(...a.map(d => d.data.length))
let numServicesTotal = 0

let data = new Array(maxClusters).fill().map((_, j) => (
	{
		'label': j,
		'duration': new Array(maxClusters).fill().map(_ => 0),
		'num_services': new Array(maxClusters).fill().map(_ => 0),
		'n_services': 0,
		'n_services_percent': 0,
		'link': new Array(maxClusters).fill().map((_, i) => i),
	}
))

a.forEach((d, i) => {
    d.data.forEach((dd, j) => {

		numServicesTotal += dd.n_services
        
		 dd.link.forEach(l => {
            if(l.link){
				data[j]['duration'][l.link.index] += l.duration * l.num_service
				data[j]['num_services'][l.link.index] += l.num_service
			}

		})
		data[j]['n_services'] += dd.n_services
    })
})


data = data.map(d => {
	d.duration = d.duration.map((_, i) => d.duration[i]/d.num_services[i])
	return d
})

// remove links with zero services

data = data.map(d => {
    d.num_services.forEach((n, i) =>{
        if(n == 0){
            d.duration[i] = -1
            d.link[i] = -1;
            d.num_services[i] = -1;
        }
    })

    d.duration = d.num_services.filter(dd => dd!=-1)
    d.link = d.link.filter(dd => dd!=-1)
    d.num_services = d.num_services.filter(dd => dd!=-1)

    return d
})

data = data.map(d => {
	d.n_services_percent = parseFloat((d.n_services/numServicesTotal*100).toFixed(2))
	return d
})




