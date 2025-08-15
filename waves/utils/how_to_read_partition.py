""" 
This is a simple example of reading and plotting a variable from the
WAVEWATCH III partition data sets.  There are several ways to go about
this, here we use basic plotting tools (matplotlib, basemap) and
NetCDF4-python to read the dataset.

For more advanced users, we recommend using XArray and Cartopy.

"""
from __future__ import print_function
from netCDF4 import Dataset, num2date
import numpy as np
from mpl_toolkits.basemap import Basemap
import matplotlib.pyplot as plt
import sys

print('USAGE: python how_to_read_partition.py filename partition_number')

# read the file name and partition number from the command line
my_file=sys.argv[1]
npart=int(sys.argv[2])

# open the dataset
nco=Dataset(my_file)

# convert the netcdf dates to python datetimes
dates=nco['date']
my_dates=num2date(dates[:],units=dates.units)

# now extract the lon,lat values and a variable from the file
lat=nco['latitude'][:]
lon=nco['longitude'][:]
swh=nco['significant_wave_height'][0,npart,]  # only want first day

# create the figure
fig=plt.figure()

# define the map projection
m=Basemap(projection='mill',llcrnrlon=lon.min(),urcrnrlon=lon.max(),
          llcrnrlat=lat.min(),urcrnrlat=lat.max(),resolution='l')

# add some details to the map
m.drawcoastlines()
m.fillcontinents()
m.drawparallels(np.arange(-90,91,10),labels=[1,0,0,0])
m.drawmeridians(np.arange(0,361,25),labels=[0,0,0,1])

# project the lon,lat values to map coordinates
x,y=m(*np.meshgrid(lon,lat))

# plot it
m.pcolormesh(x,y,swh,cmap='gist_rainbow')
m.colorbar()

# add a title
plt.title(my_dates[0].strftime('%Y%m%d')+' SWH partition '+str(npart))

# display it
plt.show()

