import React, {useEffect} from 'react';
import Zeroconf from 'react-native-zeroconf';


const FindLocalDevice = ({setSearchState}) => {
  useEffect(() => {
    const zeroconf = new Zeroconf();
    zeroconf.on('start', () => {
      console.log('[Start]');
      setSearchState('Searching');
    });

    zeroconf.on('stop', () => {
      console.log('[Stop]');
    });

    zeroconf.on('found', service => {
      //   console.log(service);
    });

    zeroconf.on('resolved', service => {
      //   clearTimeout(searchTimeout);
      setSearchState('Device Found');

      if (service.name === 'testme') {
        setSearchState(service.host);
      }
      console.log(service);
      //   console.log(zeroconf.getServices());
    });

    zeroconf.on('error', err => {
      setSearchState(`Error: ${err}`);
      console.log('[Error]', err);
    });
    //start the scan immediately
    zeroconf.scan('http', 'tcp', 'local.');

    return () => {
      zeroconf.stop();
      zeroconf.removeDeviceListeners();
    };
  }, []);

  //   we will stop the scan if we can't find any device
  //   const searchTimeout = setTimeout(() => {
  //     zeroconf.stop();
  //   }, 5000);

  return null;
};
export default FindLocalDevice;
