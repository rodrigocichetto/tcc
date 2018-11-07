(() => {

    // $(() => {

    //     const socket = io.connect('http://localhost:3000');
    //     socket.on('irrigation:updated', (data) => {
    //         console.log(data);
    //     });

    // });

    // const socket = io();
    const socket = io.connect('http://localhost:3000');
    socket.on('irrigation:updated', (data) => {
        console.log(data);
        $(`.${data._id}`).find('.status-icon').removeClass(['text-warning', 'text-success']);
        $(`.${data._id}`).find('.status-icon').addClass((data.status == 'true') ? 'text-success' : 'text-warning');
        $.each(data, (key, value) => {
            if (key != '_id') {
                if (key != 'status') {
                    $(`.${data._id}`).find(`.${key}`).text(value);
                } else {
                    $(`.${data._id}`).find(`.${key}`).text((value == 'true') ? 'Ativado' : 'Desativado');
                }
            }
        });
    });

})()