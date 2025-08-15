function read_partition(my_file,partition)

  nco=ncgeodataset(my_file);

  gvar=nco.geovariable('significant_wave_height');
  grid=gvar.grid_interop();  
  date=grid.time(1);
  lon=double(nco{'longitude'}(1,:));
  lat=double(nco{'latitude'}(1,:));
  % remember that partitions in matlab are off by 1 (no zero-index) 
  swh=double(nco{'significant_wave_height'}(1,:,partition+1));
  
  m_proj('miller','lon',[min(lon(:)) max(lon(:))],'lat',[min(lat(:)) max(lat(:))]);
  m_scatter(lon,lat,20,swh,'filled');
  colorbar()
  m_coast('patch',[.7 .7 .7])
  m_grid('box','fancy')

  title(['Partition ',num2str(partition),' for ',datestr(date)]);
  return
