SELECT distrito, concelho, freguesia 
    FROM parishes 
    WHERE ST_Contains(
        geom, ST_GeometryFromText(
            ST_AsText(
                ST_Transform(
                    ST_GeomFromText('POINT( -8.648163 41.162184)',4326),3763
                )
            ),3763
        )
    )